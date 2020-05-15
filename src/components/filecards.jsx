import React, { Component } from 'react';
import FileCard from './filecard';
import PurchaseFile from './purchasefile';


//update image here to give buyers a "sneaky" preview -> put image in media folder first
import file1Preview from "../media/smiling-face.png";

class FileCards extends Component {
    //update fileName, fileprice and filepreview here
    //As soon as a complete object is added -> a new filecard will be created
    //Update Enzypt fileUrl to sell your files.
    state = {
        fileCards: [
            {id:1, fileName:"fileName1", filePrice: 0.1, filePreview: file1Preview, 
            fileUrl:"https://enzypt.io/EYBizx1ZJZUO1H92ANiLa4PJRGcIiK4g/XvTQPT4lGqiy771u2vZiQe9-1T0TK2ZNTlbkFs0HRzY"},
            
            {id:2, fileName:"fileName2", filePrice: 0, filePreview: file1Preview, 
            fileUrl:"https://enzypt.io/uwXPiThGn2S8cKi87wRTDRi9xQl7Gjp6/uiAzz3S2xDEOUmZDfuJcYVi5RGae5kQ__JkVfrTpyN4"}
        ],
        buyClicked: false,
        fileUrl: null,
        dKey: null,
        filePrice: null
    }

    handleBuy = (fileCard) => {
      const urlParts = fileCard.fileUrl.split('/');

      this.setState({fileUrl: urlParts[3], dKey: urlParts[4], buyClicked: true, filePrice: fileCard.filePrice }, );
    }
    

    render() { 
      const buyClicked = this.state.buyClicked;
        return (
          <React.Fragment>
            <div>
              {buyClicked
                ? <PurchaseFile fileUrl={this.state.fileUrl} dKey={this.state.dKey} 
                    filePrice={this.state.filePrice} />
                : 
                <div>
                  <h2><b>Selling files</b></h2>
                  {this.state.fileCards.map(fileCard => (
                      <FileCard
                        key={fileCard.id}
                        fileCard={fileCard}
                        onBuy={this.handleBuy}
                      />
                  ))}
                </div>
              } 
            </div>
          </React.Fragment>
        );
    }
    
}
 
export default FileCards;