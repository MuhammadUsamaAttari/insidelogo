import React from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';
import download from './download.jpg'
import firebase from 'firebase'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const firebaseConfig = {
  apiKey: "AIzaSyDnpIB37FeVTyE8teDdXDSGSrj8FfaGAZ4",
  authDomain: "abbas-attarii.firebaseapp.com",
  databaseURL: "https://abbas-attarii.firebaseio.com",
  projectId: "abbas-attarii",
  storageBucket: "abbas-attarii.appspot.com",
  messagingSenderId: "990953207630",
  appId: "1:990953207630:web:4d2b3e0041b278ec2c501f",
  measurementId: "G-HHD5RBHVQN"
};
firebase.initializeApp(firebaseConfig)
 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: '',
            subtitle: "",
            description:'',
          pictures: []
        }
    }

    subtitleHandler = (e) => {
        this.setState({ subtitle: e.target.value })
    }

    descriptionHandler = (e) => {
      this.setState({ description: e.target.value })
  }

    onDrop =(picture) => {
      let allPictures = []
      picture.map((picture)=>{
        console.log(picture , 'picture')
        var storageRef = firebase.storage().ref();
        storageRef.child('Images').put(picture).then(function(snapshot) {
          console.log(storageRef , 'storageRef')
          console.log('Uploaded a blob or file!');
         var downloadedUrl =  storageRef.child('Images').getDownloadURL((url)=>  console.log(url))
         console.log(downloadedUrl)
        //  let url =  snapshot.downloadURL
        //  allPictures.push(url)
        //  console.log(allPictures)
        });
        
        console.log(picture , 'picture')
      })
      // this.setState({
      //     pictures: this.state.pictures.concat(picture),
      // });
  }

 
    render() {
        let {heading , subtitle, description} = this.state
        return (
            <div>


              <img src={download} alt='mypics' width='200px'/>              

              <br/>
            Heading <br/>
            <input placeholder={'Heading'} value={heading}
            onChange={(e) => this.setState({ heading: e.target.value })}
            />
              
            <br/> <br/>
              
            Sub Title <br/>
            <input placeholder={'Sub Title'} value={subtitle}
            onChange={this.subtitleHandler}
            />
            
            <br/><br/>
            Description <br/>
            <input className="Input-description" placeholder={'Description'} value={description}
            onChange={this.descriptionHandler}
            />


             
              <hr/>


            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />

                
            </div>
             );
            }
           }

           export default App;
