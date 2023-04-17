import React from 'react';
// "FIPS": "500300",
//         "population": "2149",
//         "property_val": "72800",
//         "kirwan_opp_index": "-0.830523",
//         "total_review_count": "3918",
//         "mean_rating": "4.0",
//         "avg_sent": "0.20183016422417488",
//         "biz_count": "19"
const TractDataView = (props) => {
    const { tractData } = props
    return (
        <>
            <ul className='list-group list-group-flush vertical-scrollable' style={{height: '100vh', overflow: 'auto'}}>
                {tractData.map((value, index) =>
                    <li className='list-group-item'>
                        <div className="card" style={{width: '18rem'}}>
                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                            <div className="card-body">
                                <h5 className="card-title">FIPS: {value.FIPS}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Population: {value.population} </li>
                                <li className="list-group-item">Businesses count: {value.biz_count} </li>
                                <li className="list-group-item">Avg. property value: ${value.property_val}</li>
                                <li className="list-group-item">Mean rating: {value.mean_rating}</li>
                                <li className="list-group-item">Total review count: {value.total_review_count}</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link"></a>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default TractDataView