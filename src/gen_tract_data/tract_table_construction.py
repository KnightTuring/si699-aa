import pandas as pd
import requests
from tqdm import tqdm
from nltk.sentiment import SentimentIntensityAnalyzer
import numpy as np
import warnings
warnings.filterwarnings('ignore')

pop = pd.read_csv('resources/population-by-tract.csv')
poptracts = pop.columns
popvals = list(pop.iloc[0])
totalpop = pd.DataFrame.from_dict({'FIPS':poptracts[1:-1],'pop':popvals[1:-1]})
totalpop = totalpop.replace(',','', regex=True)
totalpop['pop'] = totalpop['pop'].astype(int)
totalpop = totalpop.fillna(0)
totalpop.FIPS = [v[13:17] + '00' for v in totalpop.FIPS]
detroit_tracts = totalpop['FIPS'].unique()

meta_df = pd.read_csv('resources/meta_df.csv')
meta_df = meta_df[(meta_df.latitude >= 42.2)&(meta_df.latitude <= 42.5) & (meta_df.longitude >= -83.3) & (meta_df.longitude <= -82.9)]
meta_df.reset_index(inplace=True, drop=True)
fipses = []
for i in tqdm(range(len(meta_df))):
    r = requests.get(
        f'https://geo.fcc.gov/api/census/area?lat={meta_df.latitude[i]}&lon={meta_df.longitude[i]}&censusYear=2020&format=json')
    try:
        fipses.append(r.json()['results'][0]['block_fips'][5:11])
    except:
        fipses.append('None')
meta_df['FIPS'] = fipses

all_reviews = pd.read_csv('resources/df.csv')
fdf = meta_df.merge(all_reviews, on='gmap', how='left')
sia = SentimentIntensityAnalyzer()
fdf['simple_sentiment'] = 0.0
for i in tqdm(range(len(fdf))):
    try:
        fdf.simple_sentiment[i] = sia.polarity_scores(fdf.text[i])['compound']
    except:
        fdf.simple_sentiment[i] = 0.0
fdf['mean_sent'] = fdf['simple_sentiment'].groupby(fdf['gmap']).transform('mean')
fdf = fdf.drop_duplicates(subset=['gmap'])[['name','gmap','address','latitude','longitude','category','avg_rating','num_of_reviews', 'mean_sent','FIPS']]
fdf = fdf[fdf.num_of_reviews>4]
fdf.reset_index(inplace=True, drop=True)

kirwan = pd.read_csv('resources/kirwanDataDownload.csv')
kirwantracts = [v[-4:]+'00' for v in kirwan.NAMELSAD10]
kirwan['FIPS'] = kirwantracts
kirwan = kirwan[['Property Values','Kirwan Opportunity Index','FIPS']]

crime = pd.read_csv('resources/crime_incidents_with_fips (1).csv')
crime['FIPS'] = [str(x)[5:11] for x in crime.census_fips]
crime['crime_ct'] = crime.groupby('FIPS').crime_id.transform('count')
crime = crime[['FIPS','crime_ct']]
seen = {}
indices = []
for i in range(len(crime)):
    if crime.FIPS[i] in seen.keys():
        continue
    else:
        indices.append(i)
        seen[crime.FIPS[i]] = 1
crime = crime.iloc[indices]
crime.reset_index(inplace=True, drop=True)

income = pd.read_csv('resources/income-data-census.csv')
income = income[['NAME','S1903_C03_012E']]
income = income.iloc[1:-1]
income.reset_index(inplace=True, drop=True)
income['FIPS'] = [x[13:17] + '00' for x in income.NAME]
income = income.rename(columns={'S1903_C03_012E':'med_income'})
income=income[['FIPS','med_income']]



df = fdf.copy()
df = pd.merge(df, kirwan, on='FIPS', how='left')
df = pd.merge(df, totalpop, on='FIPS', how='left')
df = pd.merge(df, crime, on='FIPS', how='left')
df = pd.merge(df, income, on='FIPS', how='left')

df['total_reviews'] = df.groupby('FIPS').num_of_reviews.transform('sum')
df['mean_rating'] = df.groupby('FIPS').avg_rating.transform('mean')
df['avg_sent'] = df.groupby('FIPS').mean_sent.transform('mean')
df['business_ct'] = df.groupby('FIPS').gmap.transform('count')
df = df[['FIPS','pop','Property Values','Kirwan Opportunity Index','total_reviews','mean_rating','avg_sent','business_ct','med_income','crime_ct']]
seen = {}
indices = []
for i in range(len(df)):
    if df.FIPS[i] in seen.keys():
        continue
    else:
        indices.append(i)
        seen[df.FIPS[i]] = 1
df = df.iloc[indices]
df.reset_index(inplace=True, drop=True)
df['log_reviews'] = np.log(df['total_reviews'])
df['log_business_ct'] = np.log(df['business_ct'])
df['log_pop'] = np.log(df['pop'])
df['log_crimes'] = np.log(df['crime_ct'])

df.med_income = df.med_income.fillna('0')
valid = []
for i in range(len(df)):
    if len(df.med_income[i]) > 1:
        valid.append(int(df.med_income[i]))
inc_mean = int(np.round(np.mean(valid)))

for i in range(len(df)):
    if len(df.med_income[i]) < 2:
        df.med_income[i] = inc_mean

df.med_income = df.med_income.astype(int)

df.to_csv('resources/tract_characteristics_fixed.csv')

x = df[df.med_income!=inc_mean]
y = df[df.med_income==inc_mean]

from sklearn.ensemble import HistGradientBoostingRegressor as HGB

Xs = x.drop('Property Values', axis=1)
ys = x['med_income']

model = HGB()
model.fit(Xs, ys)

preds = model.predict(y.drop('Property Values', axis=1))
preds = [int(pred) for pred in preds]
y['med_income'] = preds

df = pd.concat([x, y])

df.to_csv('resources/tract_characteristics_fixed.csv')