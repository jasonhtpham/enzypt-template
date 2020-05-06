import React, { Component } from 'react';

//Update profile picture to be render at the top of the page
import profilepic from '../media/smiling-face.png'

class NavBar extends Component {
    // state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className="profile-image flex-align-center">
                    <img src={profilepic} alt="abc" width="200" height="200" />
                </div>
                <div className="iconholder flex-align-center">
				{/* Facebook Logo, update href & fill */}
				<a
				  target="_blank"
				  rel="noopener noreferrer"
				  href=""
				  className="Social-Link"
				>
				  <div alt="" className="social-logo">
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  width="35"
					  height="35"
					  viewBox="0 0 24 24"
					>
					  <g fill="none" fillRule="evenodd">
						<path d="M0 0h24v24H0z" />
						<path fill="#8C90A2" d="M12 1c6.075 0 11 4.925 11 11s-4.925
						11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 1 0 0 18 9 9 0 0
						0 0-18zm3 4v2h-1a1 1 0 0 0-1 1v1.004L15 11v2l-2
						.004V18h-2v-4.996L9 13v-2l2 .004V10a3 3 0 0 1 3-3h1z"
						opacity="1" />
					  </g>
					</svg>
				  </div>
				</a>
				{/* Twitter Logo, update href & fill */}
				<a
				  target="_blank"
				  rel="noopener noreferrer"
				  href=""
				  className="Social-Link"
				>
				  <div alt="" className="social-logo">
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  width="35"
					  height="35"
					  viewBox="0 0 24 24"
					>
					  <g fill="none" fillRule="evenodd">
						<path d="M0 0h24v24H0z" />
						<path
						  fill="#8C90A2"
						  d="M21.12 4.508l1.414.165-.636 1.275-.931 1.865a1.475 1.475 0 0 1-.197.397c-.04.063-.177.262-.183.272a2.096 2.096 0 0 0-.082.131v2.389c0 6.112-5.915 9.995-11.501 9.995-1.143 0-2.012-.054-3.006-.271-1.637-.357-2.855-1.067-3.412-2.308l-.574-1.277 1.395-.129c1.261-.116 2.355-.356 3.195-.678-2.306-.37-3.598-1.383-3.598-3.285v-1h1c.22 0 .417-.018.595-.05C2.868 10.963 2 9.303 2 7.001v-.204c-.007-1.16.055-1.78.373-2.571.204-.508.498-.977.894-1.407L4.023 2l.733.838c2.418 2.764 4.808 4.44 7.248 4.643.01-2.55 1.938-4.48 4.5-4.48 1.195 0 2.279.454 3.13 1.272.467.096.962.174 1.486.235zm-2.211 1.654l-.307-.07-.212-.232c-.512-.561-1.154-.858-1.886-.858-1.463 0-2.5 1.042-2.5 2.5 0 .238-.006.387-.036.584-.118.785-.558 1.416-1.464 1.416-2.998 0-5.703-1.607-8.34-4.35-.136.414-.168.838-.164 1.635l.001.215c0 2.048.83 3.168 2.794 3.792l.698.222v.731c0 .887-.84 1.722-2.07 2.096.563.428 1.716.659 3.58.659h1v1c0 1.432-1.645 2.554-4.132 3.14.81.248 1.89.355 3.133.355 4.614 0 9.5-3.208 9.5-7.995v-2.5c0-.294.086-.55.227-.814.055-.104.116-.203.192-.316l.108-.16.08-.158.384-.77a16.89 16.89 0 0 1-.586-.122z"
						  opacity="1"
						/>
					  </g>
					</svg>
				  </div>
				</a>
				{/* Instagram Logo, update href & fill */}
				<a
				  target="_blank"
				  rel="noopener noreferrer"
				  href=""
				  className="Social-Link"
				>
				  <div alt="" className="social-logo">
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  width="35"
					  height="35"
					  viewBox="0 0 24 24"
					>
					  <g fill="none" fillRule="evenodd">
						<path d="M0 0h24v24H0z" />
						<path
						  fill="#8C90A2"
						  d="M16 2a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h8zm0 2H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
						  opacity="1"
						/>
					  </g>
					</svg>
				  </div>
				</a>
				{/* LinkedIn Logo, update href & fill */}
				<a
				  target="_blank"
				  rel="noopener noreferrer"
				  href=""
				  className="Social-Link"
				>
				  <div alt="" className="social-logo">
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  width="35"
					  height="35"
					  viewBox="0 0 24 24"
					>
					  <g fill="none" fillRule="evenodd">
						<path d="M0 0h24v24H0z" />
						<path
						  fill="#8C90A2"
						  d="M20 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm0 2H4v16h16V4zm-8 5v.254A4.405 4.405 0 0 1 13.5 9c1.87 0 3.392 1.248 3.494 2.83L17 12v5h-2v-5c0-.482-.604-1-1.5-1-.813 0-1.42.347-1.493.89L12 12v5h-2V9h2zM9 9v8H7V9h2zM8 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
						  opacity="1"
						/>
					  </g>
					</svg>
				  </div>
				</a>					
			</div>
            </React.Fragment>
        );
    }
}
 
export default NavBar;