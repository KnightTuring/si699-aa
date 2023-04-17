# SI699-AA
Health score for local businesses

This project calculates a health score for census tracts in Detroit. The health score is an indication of how a tract is in terms of the health of it's businesses, the median income and the unemployment rate (among several other factors).

To get a glimpse of what the system looks like feel free to visit the links below:

Front-end: https://si-699-fe.herokuapp.com/#

Back-end:https://si699-deployment.herokuapp.com/

The following REST APIs are available:
- `/get_business_data` - Get data for all businesses in Detroit across all tracts.
- `/get_business_data/<tract_num>` - Get data for businesses in the tract with FIPS code `tract_num`.
- `/get_tract_data` - Get data for all tracts (including the health score).

-----------
