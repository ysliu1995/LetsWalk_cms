import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUploading from "react-images-uploading";
import Fab from '@material-ui/core/Fab';
import PhotoIcon from '@material-ui/icons/Photo';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import {storage} from "./firebase/firebase";

class TeamList extends React.Component {
	state = {
		roomInfo: [],
		userInfo: [],
		message: [],
		open: false,
		photo: false,
		content: "",
		imageList: [],
	}

	componentDidMount() {
		this.setState({
			open: false,
		});
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo')
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				roomInfo: JSON.parse(data).room,
				userInfo: JSON.parse(data).users,
			})
			console.log(this.state.roomInfo);
			this.sortedTeam();
			// console.log(this.state.userInfo);
			this.setState({
				open: false,
			});
        })
        .catch(console.log)
	}
	sortedTeam() {
		this.state.roomInfo.sort(function(a, b){
			return a.position > b.position ? 1 : -1;
		})
		console.log(this.state.roomInfo);
	}
	handleClickOpen = () => {
		this.setState({
			open: true,
		})
	};

	handleClickOpen1 = () => {
		this.setState({
			photo: true,
		})
	};

	handleClickClose = () => {
		this.setState({
			open: false,
		})
	};

	handleClickClose1 = () => {
		this.setState({
			photo: false,
		})
	};

	handleClose = () => {
		this.setState({
			open: false,
			progressOpen: true,
		})
		console.log(this.state.content);
		console.log("上傳")
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToAllRoom"), params = { content:this.state.content, kind: "text" }
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		fetch(url)
        .then(res => res.json())
        .then((data) => {
			console.log(data);
			console.log("下載");
			fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo')
			.then(res => res.json())
			.then((data) => {
				this.setState({ 
					roomInfo: JSON.parse(data).room,
					userInfo: JSON.parse(data).users,
				})
				console.log(this.state.roomInfo);
				console.log(this.state.userInfo);
				this.sortedTeam();
				this.setState({
					open: false,
				});
			})
			.catch(console.log)
        })
        .catch(console.log)
	};

	

	// handleFireBaseUpload = e => {
	// 	e.preventDefault()
		
	// }
	dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);
	
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	
		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
	
		return new Blob([ia], {type:mimeString});
	}

	handleClose1 = () => {
		this.setState({
			photo: false,
			progressOpen: true,
		})
		console.log(this.state.imageList[0]);
		console.log('start of upload')
		const today = new Date();
		let date = "";
		date = today.getFullYear() + 
				(today.getMonth() < 10 ? "0" : "") + (today.getMonth()+1) + 
				(today.getDate() < 10 ? "0" : "") + today.getDate() + "_" + 
				(today.getHours() < 10 ? "0" : "") + today.getHours() + 
				(today.getMinutes() < 10 ? "0" : "") + today.getMinutes() + 
				(today.getSeconds() < 10 ? "0" : "") + today.getSeconds()
		console.log(date)
		const uploadTask = storage.ref('/').child(date+".jpg").put(this.dataURItoBlob(this.state.imageList[0].dataURL))
		//initiates the firebase side uploading 
		uploadTask.on('state_changed', 
		(snapShot) => {
			
		}, (err) => {
			//catches the errors
			console.log(err)
		}, () => {
		// gets the functions from storage refences the image storage in firebase by the children
		// gets the download url then sets the image from firebase as the value for the imgUrl key:
			storage.ref('/').child(date).getDownloadURL()
			.then(fireBaseUrl => {
				// console.log(fireBaseUrl)
			})
			//takes a snap shot of the process as it is happening
			var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToAllRoom"), params = { content:date, kind: "photo" }
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
			fetch(url)
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				console.log("下載");
				fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo')
				.then(res => res.json())
				.then((data) => {
					this.setState({ 
						roomInfo: JSON.parse(data).room,
						userInfo: JSON.parse(data).users,
					})
					console.log(this.state.roomInfo);
					console.log(this.state.userInfo);
					this.sortedTeam();
					this.setState({
						open: false,
					});
				})
				.catch(console.log)
			})
			.catch(console.log)
		})
	};

	handleChange = (e) => {
        this.setState({
            content: e.target.value
        });
	}

	onChange = (imageList) => {
		// data for submit
		console.log(imageList);
		this.setState({
			imageList: imageList,
		});
	};

	render () {
		let data = [];
		if(this.state.roomInfo.length !== 0){
			let len = this.state.roomInfo.length;
			for(let i=0;i<len;i++){
				data.push(
					<Grid item xs={3}>
						<Paper>
							<List>
								<ListItem button component={Link} to={{pathname: "/teaminfo", state:{roomId: this.state.roomInfo[i].id, userInfo:this.state.userInfo, user1:this.state.roomInfo[i].user[0], user2:this.state.roomInfo[i].user[1]}}}>
									<ListItemText>
										{ this.state.userInfo[this.state.roomInfo[i].user[0]] } & { this.state.userInfo[this.state.roomInfo[i].user[1]] }
									</ListItemText>
									{ this.state.roomInfo[i].active === 1 ?
										((this.state.roomInfo[i].position >= 1 && this.state.roomInfo[i].position <= 13) || (this.state.roomInfo[i].position >= 24 && this.state.roomInfo[i].position <= 35) || (this.state.roomInfo[i].position >= 45 && this.state.roomInfo[i].position <= 56))?
										<ListItemText style={{backgroundColor : "#37ABA2", textAlign : "center", color: "#FFFFFF"}}>
											組隊中
										</ListItemText> :
										<ListItemText style={{backgroundColor : "#66B3FF", textAlign : "center", color: "#FFFFFF"}}>
											組隊中
										</ListItemText> :
										<ListItemText style={{backgroundColor : "#37ABA2", textAlign : "center", color: "#FFFFFF"}}>
											已離開
										</ListItemText> 
									}
								</ListItem>
							</List>
						</Paper>
					</Grid>
				)
			}
		}
        
		return (
			<div>
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Breadcrumbs aria-label="breadcrumb">
							<Typography color="textPrimary">隊伍列表</Typography>
						</Breadcrumbs>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							{ data }
						</Grid>
					</Grid>
					<Fab color="primary" aria-label="text" onClick={this.handleClickOpen} style={{backgroundColor: "#37ABA2", right: "20px", bottom: "10px", left: "auto", position: "absolute"}}>
						<TextFieldsIcon />
					</Fab>
					<Fab color="primary" aria-label="photo" onClick={this.handleClickOpen1} style={{backgroundColor: "#37ABA2", right: "100px", bottom: "10px", left: "auto", position: "absolute"}}>
						<PhotoIcon />
					</Fab>
					<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Ｗalking Talking</DialogTitle>
							<DialogContent>
							<DialogContentText>
								傳送圖片至全部聊天室
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								value={this.state.content}
								onChange={this.handleChange}
								label="要說的話..."
								fullWidth
							/>
							</DialogContent>
							<DialogActions>
							<Button onClick={this.handleClickClose} color="primary">
								取消
							</Button>
							<Button onClick={this.handleClose} color="primary">
								確認
							</Button>
							</DialogActions>
						</Dialog>
						<Dialog open={this.state.photo}  aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Ｗalking Talking</DialogTitle>
							<DialogContent>
							<DialogContentText>
								傳送訊息至全部聊天室
							</DialogContentText>
							<ImageUploading
								onChange={this.onChange}
								maxNumber={1}
								multiple
								maxFileSize={5 * 1024 * 1024}
								acceptType={["jpg", "gif", "png"]}
							>
								{({ imageList, onImageUpload, onImageRemoveAll }) => (
								// write your building UI
								<div>
									<button onClick={onImageUpload}>Upload images</button>
									{/* <button onClick={onImageRemoveAll}>Remove all images</button> */}

									{imageList.map((image) => (
									<div key={image.key}>
										<img src={image.dataURL} width="400" height="400" />
										{/* <button onClick={image.onUpdate}>Update</button> */}
										<button onClick={image.onRemove}>Remove</button>
									</div>
									))}
								</div>
								)}
							</ImageUploading>
							</DialogContent>
							<DialogActions>
							<Button onClick={this.handleClickClose1} color="primary">
								取消
							</Button>
							<Button onClick={this.handleClose1} color="primary">
								確認
							</Button>
							</DialogActions>
						</Dialog>
				</Grid>
				<Backdrop style={{ color: '#fff'}} open={this.state.open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		);
	}
}
export default TeamList;