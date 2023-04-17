import React, { Component }  from 'react';

const DataView = (props) => {
    const {granularData} = props
    return (
        <>
            <ul className='list-group list-group-flush vertical-scrollable' style={{height: '100vh', overflow: 'auto'}}>
                {granularData.map((value, index) =>
                    <li className='list-group-item'>
                        <div className="card" style={{width: '18rem'}}>
                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                            <div className="card-body">
                                <h5 className="card-title">{value.id} - {value.name}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Rating: {value.rating}</li>
                                <li className="list-group-item">Review count: {value.yelp_review_count}</li>
                                <li className="list-group-item">Crime count: {value.crime_count}</li>
                                <li className="list-group-item">FIPS: {value.census_tract_fips}</li>
                            </ul>
                            <div className="card-body">
                                <a href={value.url} className="card-link">Yelp!</a>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
    // return(
    //     <>
    //     <ul className='list-group list-group-flush vertical-scrollable' style={{height: '100vh', overflow: 'auto'}}>
    //         <li className='list-group-item'>
    //             <div className="card" style={{width: '18rem'}}>
    //                 <img className="card-img-top" src="..." alt="Card image cap" />
    //                 <div className="card-body">
    //                     <h5 className="card-title">Card title</h5>
    //                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 </div>
    //                 <ul className="list-group list-group-flush">
    //                     <li className="list-group-item">Cras justo odio</li>
    //                     <li className="list-group-item">Dapibus ac facilisis in</li>
    //                     <li className="list-group-item">Vestibulum at eros</li>
    //                 </ul>
    //                 <div className="card-body">
    //                     <a href="#" className="card-link">Link</a>
    //                 </div>
    //             </div>
    //         </li>
    //         <li className='list-group-item'>
    //             <div className="card" style={{width: '18rem'}}>
    //                 <img className="card-img-top" src="..." alt="Card image cap" />
    //                 <div className="card-body">
    //                     <h5 className="card-title">Card title</h5>
    //                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 </div>
    //                 <ul className="list-group list-group-flush">
    //                     <li className="list-group-item">Cras justo odio</li>
    //                     <li className="list-group-item">Dapibus ac facilisis in</li>
    //                     <li className="list-group-item">Vestibulum at eros</li>
    //                 </ul>
    //                 <div className="card-body">
    //                     <a href="#" className="card-link">Link</a>
    //                 </div>
    //             </div>
    //         </li>
    //         <li className='list-group-item'>
    //             <div className="card" style={{width: '18rem'}}>
    //                 <img className="card-img-top" src="..." alt="Card image cap" />
    //                 <div className="card-body">
    //                     <h5 className="card-title">Card title</h5>
    //                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 </div>
    //                 <ul className="list-group list-group-flush">
    //                     <li className="list-group-item">Cras justo odio</li>
    //                     <li className="list-group-item">Dapibus ac facilisis in</li>
    //                     <li className="list-group-item">Vestibulum at eros</li>
    //                 </ul>
    //                 <div className="card-body">
    //                     <a href="#" className="card-link">Link</a>
    //                 </div>
    //             </div>
    //         </li>
    //         <li className='list-group-item'>
    //             <div className="card" style={{width: '18rem'}}>
    //                 <img className="card-img-top" src="..." alt="Card image cap" />
    //                 <div className="card-body">
    //                     <h5 className="card-title">Card title</h5>
    //                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 </div>
    //                 <ul className="list-group list-group-flush">
    //                     <li className="list-group-item">Cras justo odio</li>
    //                     <li className="list-group-item">Dapibus ac facilisis in</li>
    //                     <li className="list-group-item">Vestibulum at eros</li>
    //                 </ul>
    //                 <div className="card-body">
    //                     <a href="#" className="card-link">Link</a>
    //                 </div>
    //             </div>
    //         </li>

    //     </ul>
    //     </>
    // )
}
export default DataView