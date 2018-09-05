import React , {Component} from 'react';
import './App.css';
//import axios from 'axios';


class App extends Component {
	constructor () {
  		super()
  		this.state = {
			date: new Date(),
			veri: [],
			isLoading: false,
      		error: null,
    };
			this.handleClick = this.handleClick.bind(this)
			
	}
	componentDidMount(){
		this.setState({ isLoading: true });
		
		this.tick();
		
		}
		componentWillUnmount() {
			  clearInterval(this.timerID);
		}
		tick(){
			
			fetch("https://api.coinmarketcap.com/v1/ticker/")
			.then(response=>{
			if(response.ok){
				return response.json();
			}else{
				throw new Error(response.Error);
			}
			})
			.then(data => this.setState({ veri: data,isLoading:false }))
			.catch(error=>this.setState({error,isLoading:false}))
		}
		componentWillUpdate(){
			this.tick();
		}
	renderLoadingView(){
		return(
			<p>Loading</p>
		);
	}
	
	handleClick () {
  	/*axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin')
		.then(response => this.setState({username: response.data.name}))*/
		
	}
	render () {
		
		const {isLoading, error } = this.state;
		if(isLoading){
			return <p>Loading...</p>
		}
		if(error){
			return <p>Hata!!!!</p>
		}
    return (
		<ul>
			<li className='title'>
				<span>Kripto Para Adı</span>
				<span>Kripto Para Sembol</span>
				<span>Kripto Para Değerleri</span>
				
			</li>	
			{this.state.veri.map((item,i)=>{
				return <li className='item'>
							<span>{item.name}</span>
							<span>{item.symbol}</span>
							<span>{item.price_usd}</span>
							
						</li>
			})}
		</ul>	
	)
 }
}
export default App;
