import React, { Component } from 'react';

class FileCard extends Component {
    render() { 
        return (
            <React.Fragment>
                <form className="card grid-container">
                   
                    <div className="image-preview">
                        <img src={this.props.preview} alt="test" width="150" height="150" /> 
                    </div>
                                
                    <div className="description">
                        <dl>
                            <dt>Description:</dt>
                            {/* Update short description here to sale your image */}
                                <dd>
                                    A short description of your image
                                </dd>
                        </dl>
                    </div>
                    <div className="card-container">
                        <div className="file-data">
                            <h4 className="filename"><i>{this.props.fileName}</i></h4>
                            <p className="fileprice">{this.props.filePrice === 0 ? "FREE" : `${this.props.filePrice} ETH` }</p>
                        </div>
                    </div>

                    <div>
                        <input className="buy-button" type="button" value="Buy" onClick={() => this.props.onBuy(this.props.filePrice)}/>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}
 
export default FileCard;

// https://enzypt.io/yQoUSuMNqL4S64NYI2D4tMgieRQwBgRC/JpkNdS8arNcBA7k3F_-yWnEUqw8YkOrMk1Z2Ka2XuXk