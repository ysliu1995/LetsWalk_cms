import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PhotoIcon from '@material-ui/icons/Photo';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageUploading from "react-images-uploading";

import {storage} from "./firebase/firebase";


const table_style = {
	padding: '50px',
}

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: "#37ABA2",
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

class TeamInfo extends React.Component {

	state = {
		roomId: "",
		roomInfo: [],
		userInfo: [],
		message: [],
		messageDate: [],
		stepInfo: [],
		user1: "",
		user2: "",
		open: false,
		photo: false,
		content: "",
		progressOpen: false,
		imageList: [],
	}

	componentDidMount() {
		const { roomId } = this.props.location.state;
		const { userInfo } = this.props.location.state;
		const { user1 } = this.props.location.state;
		const { user2 } = this.props.location.state;
		this.setState({
			roomId : roomId,
			userInfo : userInfo,
			user1 : user1,
			user2 : user2,
			progressOpen : true, 
		})
		console.log(roomId);
		console.log(userInfo);

		console.log("下載")
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"), params = { room:roomId }
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		fetch(url)
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				message: JSON.parse(data).message,
				messageDate: JSON.parse(data).messageDate,
				stepInfo: JSON.parse(data).stepData[0],
				progressOpen : false, 
			})
			console.log(this.state.message);
			console.log(this.state.stepInfo);
			console.log(this.state.messageDate);
        })
        .catch(console.log)
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
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToRoom"), params = { room:this.state.roomId, content:this.state.content, kind: "text" }
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		fetch(url)
        .then(res => res.json())
        .then((data) => {
			console.log(data);
			console.log("下載");
			var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"), params = { room:this.state.roomId }
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
			fetch(url)
			.then(res => res.json())
			.then((data) => {
				this.setState({ 
					message: JSON.parse(data).message,
					stepInfo: JSON.parse(data).stepData[0],
					progressOpen: false,
				})
				console.log(this.state.stepInfo);
			})
			.catch(console.log)
        })
        .catch(console.log)
	};

	handleFireBaseUpload = e => {
		e.preventDefault()
		
	}
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
			var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToRoom"), params = { room:this.state.roomId, content:date, kind: "photo" }
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
			fetch(url)
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				console.log("下載");
				var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"), params = { room:this.state.roomId }
				Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
				fetch(url)
				.then(res => res.json())
				.then((data) => {
					this.setState({ 
						messageDate: JSON.parse(data).messageDate,
						message: JSON.parse(data).message,
						stepInfo: JSON.parse(data).stepData[0],
						progressOpen: false,
					})
					console.log("testtesttest");
					console.log(this.state.stepInfo);
					console.log(this.state.message);
				})
				.catch(console.log)
			})
			.catch(console.log)
		})
	};

	downloadImg = (imagepath) => {
		console.log(imagepath)
		storage.ref('/').child(imagepath).getDownloadURL()
		.then(fireBaseUrl => {
			console.log(fireBaseUrl)
			return fireBaseUrl;
		})
	}

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

	download = () => {
		//儲存步數資訊
		let f1 = "";
		f1 += "Data,StepGoal,TotalStep," + this.state.userInfo[this.state.user1] + "," + this.state.userInfo[this.state.user2] + "\r\n";
		for (const [key, value] of Object.entries(this.state.stepInfo)) {
			f1 += key + "," + value.TotalStep + "," + value.teamStep + "," + value[this.state.user1] + "," + value[this.state.user2] +  "\r\n";
		}
		console.log('儲存步數資訊');
		const element1 = document.createElement("a");
		const file1 = new Blob([f1]);
		element1.href = URL.createObjectURL(file1);
		element1.download = "step(" + this.state.userInfo[this.state.user1] + "-" + this.state.userInfo[this.state.user2] + ").csv";
		document.body.appendChild(element1); 
		element1.click();
		//儲存聊天室內容
		let f2 = "";
		f2 += "sender,message\r\n";
		console.log(this.state.message.length)
		for(let i=0;i<this.state.message.length;i++){
			if(this.state.message[i].sender === "admin") {
				if(this.state.message[i].kind === "photo"){
					f2 += this.state.messageDate[i] + ", Mini Steps," + "https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+this.state.message[i].content+"?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149" + "\r\n";
				} else{
					f2 += this.state.messageDate[i] + ", Mini Steps," + this.state.message[i].content + "\r\n";
				}
			} else {
				if(this.state.message[i].kind === "photo"){
					f2 += this.state.messageDate[i] + ", " + this.state.userInfo[this.state.message[i].sender] + ", " + "https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+this.state.message[i].content+"?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149" + "\r\n";
				} else{
					f2 += this.state.messageDate[i] + ", " + this.state.userInfo[this.state.message[i].sender] + "," + this.state.message[i].content + "\r\n";
				}
				
			}
			console.log(f2);
		}
		console.log(f2)
		console.log('儲存聊天室內容');
		const element2 = document.createElement("a");
		const file2 = new Blob([f2]);
		element2.href = URL.createObjectURL(file2);
		element2.download = "chat(" + this.state.userInfo[this.state.user1] + "-" + this.state.userInfo[this.state.user2] + ").csv";
		document.body.appendChild(element2); 
		element2.click();
	  }

	render () {
		let stepList = [];
		for (const [key, value] of Object.entries(this.state.stepInfo)) {
			console.log(key, value);
			stepList.push(<TableRow>
							<CustomTableCell align="center">{ key }</CustomTableCell>
							<CustomTableCell align="center">{ value.TotalStep }</CustomTableCell>
							<CustomTableCell align="center">{ value.teamStep }</CustomTableCell>
							<CustomTableCell align="center">{ value[this.state.user1] }</CustomTableCell>
							<CustomTableCell align="center">{ value[this.state.user2] }</CustomTableCell>
						</TableRow>)
		}
		console.log(stepList);
        
		return (
			<div>
				<Grid container spacing={5}>
					<Grid item xs={10}>
						<Breadcrumbs aria-label="breadcrumb">
							<Typography component={Link} color="inherit" to="/teamlist" >
								隊伍列表
							</Typography>
							<Typography color="textPrimary">隊伍資訊( {this.state.userInfo[this.state.user1]} - {this.state.userInfo[this.state.user2] })</Typography>
						</Breadcrumbs>
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" onClick={this.download} color="primary" style={{align:"right", backgroundColor:"#37ABA2"}}>
							儲存檔案
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Table style={table_style}>
							<TableHead>
								<TableRow>
									<CustomTableCell align="center">Date</CustomTableCell>
									<CustomTableCell align="center">Step Goal</CustomTableCell>
									<CustomTableCell align="center">total steps</CustomTableCell>
									<CustomTableCell align="center">{ this.state.userInfo[this.state.user1] }'s steps</CustomTableCell>
									<CustomTableCell align="center">{ this.state.userInfo[this.state.user2] }'s steps</CustomTableCell>
								</TableRow>
							</TableHead>
						<TableBody>
						{ stepList }
						</TableBody>
					</Table>
					</Grid>
					<Grid item xs={6}>
						<Paper style={{maxHeight: 450, overflow: 'auto'}}>
							<List>
								{this.state.message.map((value, index, array) => (
									<ListItem>
										{ this.state.message[index].kind === "photo" &&
											<ListItemText>
												<Grid container>
													<Grid item xs={6}>
														{ this.state.message[index].sender === "admin" && 
															<Grid item xs={6}>
																Mini Steps <img src={"https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+this.state.message[index].content+".jpg?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149"} width="200" height="200"></img>
															</Grid>
														}
														{ this.state.message[index].sender !== "admin" && 
															<Grid item xs={6}>
															{ this.state.userInfo[this.state.message[index].sender] } <img src={"https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+this.state.message[index].content+".jpg?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149"} width="200" height="200"></img>
															</Grid>
														}
													</Grid>
													<Grid item xs={6} align="right">
														{ this.state.messageDate[index] }
													</Grid>
												</Grid>
											</ListItemText>
										}
										{ this.state.message[index].kind !== "photo" &&
											<ListItemText>
												<Grid container>
													<Grid item xs={6}>
														{ this.state.message[index].sender === "admin" && 
															<Grid item xs={6}>
																Mini Steps : { this.state.message[index].content }
															</Grid>
														}
														{ this.state.message[index].sender !== "admin" && 
															<Grid item xs={6}>
															{ this.state.userInfo[this.state.message[index].sender] } : { this.state.message[index].content }
															</Grid>
														}
													</Grid>
													<Grid item xs={6} align="right">
														{ this.state.messageDate[index] }
													</Grid>
												</Grid>
											</ListItemText>
										}
									</ListItem>
								))}
							</List>
						</Paper>
						<Fab color="primary" aria-label="text" onClick={this.handleClickOpen} style={{backgroundColor: "#37ABA2", right: "20px", bottom: "10px", left: "auto", position: "absolute"}}>
							<TextFieldsIcon />
						</Fab>
						<Fab color="primary" aria-label="photo" onClick={this.handleClickOpen1} style={{backgroundColor: "#37ABA2", right: "100px", bottom: "10px", left: "auto", position: "absolute"}}>
							<PhotoIcon />
						</Fab>
						<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Let's Walk</DialogTitle>
							<DialogContent>
							<DialogContentText>
								傳送訊息至聊天室
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
							<DialogTitle id="form-dialog-title">Let's Walk</DialogTitle>
							<DialogContent>
							<DialogContentText>
								傳送照片至聊天室
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
				</Grid>
				<Backdrop style={{ color: '#fff'}} open={this.state.open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		);
	}
}
export default TeamInfo;