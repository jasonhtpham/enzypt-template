import React, { Component } from 'react';

//update source here to 
import testpic from "../media/smiling-face.png";

class FileCard extends Component {
    // state = {  }
    render() { 
        return (
            <React.Fragment>
                {/* Update img.src in div.image-preview to provide preview of selling picture */}
                <div className="card">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="image-preview">
                                        <a href="https://enzypt.io/yQoUSuMNqL4S64NYI2D4tMgieRQwBgRC/JpkNdS8arNcBA7k3F_-yWnEUqw8YkOrMk1Z2Ka2XuXk" 
                                        target="_blank"
                                        rel="noopener noreferrer">
                                            <img src={testpic} alt="test" width="150" height="150" /> 
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <div className="description">
                                        <dl>
                                            <dt>Description:</dt>
                                            <dd>
                                                A picture of Jason presenting his work at Digital ID Hackathon 2020.
                                            </dd>
                                        </dl>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/*  Update div.filename value to change file name
                         Update div.fileprice value to change file price */}
                    <div className="card-container">
                        <h4 className="filename"><i>Jason_at_DI</i></h4>
                        <p className="fileprice">$ FREE</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default FileCard;