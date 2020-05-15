import React, { Component } from 'react';

class FileCard extends Component {
  render() { 
      return (
          <React.Fragment>
              <form className="card grid-container">
                  
                  <div className="image-preview">
                      <img src={this.props.fileCard.filePreview} alt="test" width="150" height="150" /> 
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
                          <h4 className="filename"><i>{this.props.fileCard.fileName}</i></h4>
                          <p className="fileprice">{this.props.fileCard.filePrice === 0 ? 
                          "FREE" : `${this.props.fileCard.filePrice} ETH` }</p>
                      </div>
                  </div>

                  <div>
                      <input className="buy-button" type="button" value="Buy" onClick={() => this.props.onBuy(this.props.fileCard)}/>
                  </div>
              </form>
          </React.Fragment>
      );
  }
}
 
export default FileCard;