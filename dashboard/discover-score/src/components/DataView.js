import React, { Component }  from 'react';

const DataView = (props) => {
    return(
        <div className="details-disp">
            <table>
                <tr>
                    <td>Name:</td>
                    <td>TestName</td>
                </tr>
                <tr>
                    <td>Lattitude:</td>
                    <td>123.456</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>-456.78</td>
                </tr>
                <tr>
                    <td>Avg. Ratings</td>
                    <td>4.0</td>
                </tr>
            </table>
        </div>
    )
}
export default DataView