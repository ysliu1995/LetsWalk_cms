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
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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
		stepInfo: [],
		user1: "",
		user2: "",
		open: false,
		content: "",
		progressOpen: false,
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
				stepInfo: JSON.parse(data).stepData[0],
				progressOpen : false, 
			})
			console.log(this.state.stepInfo);
        })
        .catch(console.log)
	}

	

	handleClickOpen = () => {
		this.setState({
			open: true,
		})
	};

	handleClickClose = () => {
		this.setState({
			open: false,
		})
	};

	handleClose = () => {
		this.setState({
			open: false,
			progressOpen: true,
		})
		console.log(this.state.content);
		console.log("上傳")
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToRoom"), params = { room:this.state.roomId, content:this.state.content }
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

	handleChange = (e) => {
        this.setState({
            content: e.target.value
        });
	}

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
		for (const [key, value] of Object.entries(this.state.message)) {
			if(value.sender === "admin") {
				f2 += "admin," + value.message + "\r\n";
			} else {
				f2 += this.state.userInfo[value.sender] + "," + value.message + "\r\n";
			}
		}
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
										{ this.state.message[index].sender === "admin" ?
											<ListItemText>
												admin : { this.state.message[index].message }
											</ListItemText> :
											<ListItemText>
												{ this.state.userInfo[this.state.message[index].sender] } : { this.state.message[index].message }
											</ListItemText>
										}
									</ListItem>
								))}
							</List>
						</Paper>
						<Fab color="primary" aria-label="add" onClick={this.handleClickOpen} style={{backgroundColor: "#37ABA2", right: "20px", bottom: "10px", left: "auto", position: "absolute"}}>
							<AddIcon />
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