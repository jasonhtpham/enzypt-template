import React, { Component } from 'react';
import FileCard from './filecard';

//update image here to give buyers a "sneaky" preview
import file1Preview from "../media/smiling-face.png";

class FileCards extends Component {
    //update fileName, fileprice and filepreview here
    //As soon as a complete object is added -> a new filecard will be created
    state = {
        fileCards: [
            {id:1, fileName:"fileName1", filePrice: 0, filePreview: file1Preview},
            {id:2, fileName:"fileName2", filePrice: 0.2, filePreview: file1Preview}
        ]
    }

    render() { 
        return (
            <div>
                {this.state.fileCards.map(fileCard => (
                    <FileCard
                    key={fileCard.id}
                    fileName={fileCard.fileName}
                    filePrice={fileCard.filePrice}
                    preview={fileCard.filePreview}
                    onBuy={this.handleBuy}
                    />
                ))}
            </div>
        );
    }

    handleBuy = (filePrice) => {
        if (filePrice === 0) {
            console.log("Free file -> Download")
        } else {
            console.log(`Pay ${filePrice} ETH to buy this -> Purchase`)
        }
        
    }

}
 
export default FileCards;