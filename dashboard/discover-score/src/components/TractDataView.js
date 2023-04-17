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
    const { tractData, setTractFocus } = props
    return (
        <>
            <ul className='list-group list-group-flush vertical-scrollable' style={{height: '100vh', overflow: 'auto'}}>
                {tractData.map((value, index) =>
                    <li className='list-group-item'>
                        <div className="card" style={{width: '18rem'}}>
                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                            <div className="card-body">
                                <h5 className="card-title">FIPS: {value.fips}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Health score: </b><button type="button" class="btn btn-primary btn-square-md">{parseFloat(value.total).toFixed(4)}</button></li>
                                <li className="list-group-item">Number of businesses: {value.n_biz} </li>
                                <li className="list-group-item">Avg. rating {parseFloat(value.avg_rating).toFixed(2)} </li>
                                <li className="list-group-item">No. of reviews: {value.n_reviews}</li>
                                <li className="list-group-item">Unemployment: {parseFloat(value.unemp).toFixed(2)}</li>
                                <li className="list-group-item">Property value: {value.prop_value}</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link" onClick={(e) => setTractFocus(parseInt(value.fips))}>Show on map</a>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}

export default TractDataView