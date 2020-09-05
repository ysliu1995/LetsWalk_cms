import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

class UserList extends React.Component {
	state = {
		userinfo: [],
		open: false,
	}

	componentDidMount() {
		this.setState({
			open: true,
		});
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllUserInfo')
        .then(res => res.json())
        .then((data) => {
			  this.setState({ userinfo: JSON.parse(data) })
			  console.log(this.state.userinfo)
			  this.state.userinfo.userinfo.sort(function(a, b){
				return a.email.localeCompare(b.email);
			  })
			  this.setState({
				open: false,
			});
        })
        .catch(console.log)
	}

	handleClose = () => {
		this.setState({
			open: false,
		});
	};
	handleToggle = () => {
		this.setState({
			open: true,
		});
	};

	handleClickOpen = () => {
		this.download()
	}

	download = () => {
		//儲存步數資訊
		let f1 = "";
		f1 += "Name, Email, points" + "\r\n";
		for (let i=0;i<this.state.userinfo.userinfo.length;i++) {
			f1 += this.state.userinfo.userinfo[i].name + "," + this.state.userinfo.userinfo[i].email+ "," + this.state.userinfo.userinfo[i].point + "\r\n";
		}
		console.log('儲存使用者資訊');
		const link = document.createElement("a");
		link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(f1));
		link.download = "UserInfo.csv";
		document.body.appendChild(link);
		link.click();
	  }

	render () {
		let data = [];
		if(this.state.userinfo.length !== 0){
			let len = this.state.userinfo.userinfo.length;
			for(let i=0;i<len;i++){
				data.push(
					<Grid item xs={3}>
						<Paper>
							<List>
								<ListItem>
									<ListItemText>
										{ this.state.userinfo.userinfo[i].name } ({this.state.userinfo.userinfo[i].age})
										<p></p>
										{this.state.userinfo.userinfo[i].email}
										<p></p>
										{ this.state.userinfo.userinfo[i].partner !== 0 ? "組隊中": "尚未組隊"}
										<p></p>
										WT points : { this.state.userinfo.userinfo[i].point }
									</ListItemText>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				)
			}
		}
        
		return (
			<div>
				<Grid container spacing={2}>
					{ data }
				</Grid>
				<Fab color="primary" aria-label="text" onClick={this.handleClickOpen} style={{backgroundColor: "#37ABA2", right: "20px", bottom: "10px", left: "auto", position: "absolute"}}>
					<CloudDownloadIcon />
				</Fab>
				<Backdrop style={{ color: '#fff',}} open={this.state.open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		);
	}
}
export default UserList;