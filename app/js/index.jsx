import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.scss'
var Map = React.createClass({
	getInitialState() {
	    return {
	        width:this.props.width,
	        height:this.props.height,  
	        start:this.props.start,
	        wallist:[],
	        foodlist:[],
	        weaponlist:[],
	        enemeylist:[],
	        player:[],
	        health:100,
	        level:1,
	        xp:10,
	        curxp:0,
	        power:20,
	        weapon:10,
	        food:10,
	    };
	},
	startGame:function(){
		this.setState({
	    	wallist:this.wallCreator(),
	    	foodlist:this.foodCreator(),
	    	weaponlist:this.weaponCreator(),
	    	enemeylist:this.enemyCreator(),
	    	player:this.playerCreator(),
	    });
	},
	componentDidMount() {
		this.startGame();
	    document.body.onkeydown = function(e){
	    	e.preventDefault();
	    	// console.log(e.which);
	    	if(e.which==37){//left horizontal col change
	    		// console.log(this.state.player);
	    		var row = this.getRowColVal(this.state.player[0])[0];
	    		var col = this.getRowColVal(this.state.player[0])[1];
	    		col = Number(col)>1 ? Number(col)-1:col;
	    		this.move(row,col);
	    	} else if(e.which==38){//up vertical row change
	    		var row = this.getRowColVal(this.state.player[0])[0];
	    		var col = this.getRowColVal(this.state.player[0])[1];
	    		row = Number(row)>1 ? Number(row)-1:row;
	    		this.move(row,col);
	    	} else if(e.which==39){//right horizontal col change;
	    		// console.log(this.state.player);
	    		var row = this.getRowColVal(this.state.player[0])[0];
	    		var col = this.getRowColVal(this.state.player[0])[1];
	    		col = Number(col)<100 ? Number(col)+1 : col;
	    		this.move(row,col);
	    	} else if(e.which==40){//down
	    		var row = this.getRowColVal(this.state.player[0])[0];
	    		var col = this.getRowColVal(this.state.player[0])[1];
	    		row = Number(row)<30 ? Number(row)+1:row;
	    		this.move(row,col);
	    	}
	    }.bind(this);
	},
	createAdd:function(row,col){
		return row+'|'+col;
	},
	getRowColVal:function(str){
		return str.split('|');
	},
	getRandom:function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},
	move:function(row,col){
		var isWall = this.state.wallist.indexOf(this.createAdd(row,col))!==-1 ? true:false;
		var isFood = this.state.foodlist.indexOf(this.createAdd(row,col))!==-1 ? true:false;
		var isWeapon = this.state.weaponlist.indexOf(this.createAdd(row,col))!==-1 ? true:false;
		var isEnemy =this.state.enemeylist.indexOf(this.createAdd(row,col))!==-1 ? true : false;
		if(isWall){
			console.log('this is wall bla bla bla');
		} else if(isFood){
			var index = this.state.foodlist.indexOf(this.createAdd(row,col));
			this.state.foodlist.splice(index,1);
			this.setState({
				player:[this.createAdd(row,col)],
				health:this.state.health+10,
			});
		} else if(isWeapon){
			var index = this.state.weaponlist.indexOf(this.createAdd(row,col));
			this.state.weaponlist.splice(index,1);
			this.setState({
				player:[this.createAdd(row,col)],
				power:this.state.power-1,
			});
		} else if(isEnemy){
			var index = this.state.enemeylist.indexOf(this.createAdd(row,col));
			this.state.enemeylist.splice(index,1);
			this.setState({
				player:[this.createAdd(row,col)],
				health:this.state.health-this.state.power,
				curxp:this.state.curxp+1,
			});
		} else {
			this.setState({player:[this.createAdd(row,col)]});
		}		
		if(this.state.health<0){
			alert('You Lose \n bla bla bla')
			this.setState({
				health:100,
		        level:1,
		        xp:10,
		        curxp:0,
		        power:20,
		        weapon:10,
		        food:10,
			});
			this.startGame();
		} else if(this.state.curxp==this.state.xp){
			this.setState({
				level:this.state.level+1,
				xp:10*(this.state.level+1),
				power:20,
				curxp:0,
				food:(10*10*(this.state.level+1)-this.state.health)/10,
			});
			// console.log(this.state.food);
			// console.log(this.state.weapon)
			this.startGame();
		}
	},
	wallCreator:function(){
		var wallist=[];
		for(var i=9;i<=this.state.height-9;i++){//row
			if(Math.random()<0.5){
				for(var j=9;j<=this.state.width-9;j++){//col
					if(Math.random()<0.5){
						if(Math.random()<0.5){//horizontal
							if(Math.random()<0.5){//left
								var togo=this.getRandom(1,8);
								for(var k=0;k<=togo;k++){
									var toadd=i+'|'+(j-k);
									var totest=i+'|'+(j-k-1);
									var totest2=(i-1)+'|'+(j-k-1);
									var totest3=(i+1)+'|'+(j-k-1);
									if(wallist.indexOf(totest)==-1 && wallist.indexOf(totest2)==-1 && wallist.indexOf(totest3)==-1){
										wallist.push(toadd);
									} else {
										var index = wallist.indexOf(toadd)-1;
										wallist.splice(index, 2)
										// console.log(toadd,'is removed');
									}
								}
							} else {//right
								var togo=this.getRandom(1,8);
								for(var k=0;k<=togo;k++){
									var toadd=i+'|'+(j+k);
									var totest=i+'|'+(j+k+1);
									var totest2=(i-1)+'|'+(j+k+1);
									var totest3=(i+1)+'|'+(j+k+1);
									if(wallist.indexOf(totest)==-1 && wallist.indexOf(totest2)==-1 && wallist.indexOf(totest3)==-1){
										wallist.push(toadd);
									}else {
										var index = wallist.indexOf(toadd)-1;
										wallist.splice(index, 2)
									}
								}
							}
						} else {//vertical
							if(Math.random()<0.5){//up
								var togo=this.getRandom(1,8);
								for(var k=0;k<=togo;k++){
									var toadd=(i-k)+'|'+j;
									var totest=(i-k-1)+'|'+j;
									var totest2=(i-k-1)+'|'+(j+1);
									var totest3=(i-k-1)+'|'+(j-1);
									if(wallist.indexOf(totest)==-1 && wallist.indexOf(totest2)==-1 && wallist.indexOf(totest3)==-1){
										wallist.push(toadd);
									}else {
										var index = wallist.indexOf(toadd)-1;
										wallist.splice(index, 2)
									}
								}
							} else {//down
								var togo=this.getRandom(1,8);
								for(var k=0;k<=togo;k++){
									var toadd=(i+k)+'|'+j;
									var totest=(i+k+1)+'|'+j;
									var totest2=(i+k+1)+'|'+(j+1);
									var totest3=(i+k+1)+'|'+(j-1);
									if(wallist.indexOf(totest)==-1 && wallist.indexOf(totest2)==-1 && wallist.indexOf(totest3)==-1){
										wallist.push(toadd);
									}else {
										var index = wallist.indexOf(toadd)-1;
										wallist.splice(index, 2)
									}
								}
							}
						}
					}
				}
			}
		}
		this.amk=wallist;
		return wallist;
	},
	foodCreator:function(){
		var foodlist=[];
		var wallist=this.amk;
		var food = this.state.food;
		while(food>0){
			var row=this.getRandom(0,30);
			var col=this.getRandom(0,100);
			var toadd = row+'|'+col;
			if(wallist.indexOf(toadd)==-1){
				foodlist.push(toadd);
				food--;
			}
		}
		this.amk=this.amk.concat(foodlist);
		return foodlist;
	},
	weaponCreator:function(){
		var weaponList=[];
		var allist = this.amk;
		var weapon = this.state.weapon;
		while(weapon>0){
			var row=this.getRandom(0,30);
			var col=this.getRandom(0,100);
			var toadd = row+'|'+col;
			if(allist.indexOf(toadd)==-1){
				weaponList.push(toadd);
				weapon--;
			}
		}
		this.amk=this.amk.concat(weaponList);
		return weaponList;
	},
	enemyCreator:function(){
		var enemyList=[];
		var allist = this.amk;
		var enemy = this.state.xp;
		while(enemy>=0){
			var row=this.getRandom(0,30);
			var col=this.getRandom(0,100);
			var toadd = row+'|'+col;
			if(allist.indexOf(toadd)==-1){
				enemyList.push(toadd);
				enemy--;
			}
		}
		this.amk=this.amk.concat(enemyList);
		return enemyList;
	},
	playerCreator:function(){
		var player=[];
		var allist = this.amk;
		var aung = 1;
		while(aung>0){
			var row=this.getRandom(0,30);
			var col=this.getRandom(0,100);
			var toadd = row+'|'+col;
			if(allist.indexOf(toadd)==-1){
				player.push(toadd);
				aung--;
			}
		}
		this.amk=this.amk.concat(player);
		return player;
	},
	render:function(){
		var wallist = this.state.wallist;
		var foodlist= this.state.foodlist;
		var weaponlist = this.state.weaponlist;
		var enemeylist = this.state.enemeylist;
		var player = this.state.player;
		var row = [];
		for(var i=1;i<=this.state.height;i++){
			//row
			var cells=[];
			for(var j=1;j<=this.state.width;j++){
				//col
				var tofind=i+'|'+j;
				var isWall = wallist.indexOf(tofind)!==-1 ? true :false;
				var isEnemy = enemeylist.indexOf(tofind)!==-1 ? true:false;
				var isWeapon = weaponlist.indexOf(tofind)!==-1 ? true:false;
				var isFood = foodlist.indexOf(tofind)!==-1 ? true:false;
				var isPlayer = player.indexOf(tofind)!==-1 ? true:false;
				// console.log(isWall,isEnemy,isWeapon,isPlayer);
				if(isWall){
					cells.push(<div className="wall" ref={tofind}></div>);
				} else {
					if(isEnemy){
						cells.push(<div className="enemy" ref={tofind}></div>);
					} else {
						if(isWeapon){
							cells.push(<div className="weapon" ref={tofind}></div>);
						} else {
							if(isPlayer){
								cells.push(<div className="play" ref={tofind}></div>);
							} else {
								if(isFood){
									cells.push(<div className="food" ref={tofind}></div>);
								} else {
									cells.push(<div className="grass" ref={tofind}></div>);
								}
							}
						}
					}
				}
			}
			row.push(
				<div className="row">
					{cells}
				</div>
			);
		}
		return (
			<div className="game">
				<div className="message">
					<div className="mes">
						<span className="title">Health</span>
						<span className="value">{this.state.health}</span>
					</div>
					<div className="mes">
						<span className="title">Level</span>
						<span className="value">{this.state.level}</span>
					</div>
					<div className="mes">
						<span className="title">xp</span>
						<span className="value">{this.state.curxp}/{this.state.xp}</span>
					</div>
				</div>
				<div className="board">
					{row}
				</div>
				<div className="message">
					<div className="mes">
						<span className="playblock"></span>
						<span className="value">Play</span>
					</div>
					<div className="mes">
						<span className="weaponblock"></span>
						<span className="value">Weapon</span>
					</div>
					<div className="mes">
						<span className="foodblock"></span>
						<span className="value">Food</span>
					</div>
					<div className="mes">
						<span className="enemyblock"></span>
						<span className="value">Enemy</span>
					</div>
				</div>
			</div>
		);
	}
});
var RDCgame = React.createClass({
	getInitialState() {
	    return {
	        width:100,
	        height:30,  
	        start:false,
	    };
	},
	render:function(){
		var width = this.state.width;
		var height = this.state.height;
		var start = this.state.start;
		return (
			<div>
				<h1><a href='./'>Roguelike Dungeon Crawler Game</a></h1>
				<Map width={width} height={height} start={start}/>
			</div>
		);
	}
});
ReactDOM.render(<RDCgame/>,document.getElementById('app'));