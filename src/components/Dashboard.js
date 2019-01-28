import React, { Component } from 'react';
import { Carousel,Grid,Row,Col,Button} from 'react-bootstrap';
import { API_KEY, PATH_BASE, NOW_PLAYING, PATH_MOVIE, PATH_PAGE,LANGUAGE, REGION } from '../api';
import { NavLink } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import '../App.css';
import Axios from 'axios';
import NavigationBar from './NavigationBar';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            film:[],
            activePage: 1,
            totalItemsCount:0,
            pageRangeDisplayed:0,
            isbought:localStorage.getItem('idbuyyer').split(','),
            // isbought:[],
            localBuyyer:[]
        }
        
        this.handlePageChange = this.handlePageChange.bind(this);
        this.buyProcess = this.buyProcess.bind(this);
        if(localStorage.getItem('saldo')==null){
            localStorage.setItem('saldo',100000);
        }
        
        if(localStorage.getItem('idbuyyer')==null){
            localStorage.setItem('idbuyyer','0');
        }
    }
    
    
    componentDidMount(){
        Axios.get(`${PATH_BASE}${PATH_MOVIE}${NOW_PLAYING}?api_key=${API_KEY}&${LANGUAGE}en-US&${REGION}ID`)
        .then((response)=>{

            const film = response.data.results;
            console.log(film)
            const dataL = response.data.total_pages*10
            this.setState({film,
                totalItemsCount:dataL,
            })

        })

    }

    handlePageChange(pageNumber) {
        Axios.get(`${PATH_BASE}${PATH_MOVIE}${NOW_PLAYING}?api_key=${API_KEY}&${LANGUAGE}en-US&${REGION}ID&${PATH_PAGE}${pageNumber}`)
        .then((response)=>{
            const film = response.data.results;
            let dataL = response.data.total_pages*10
            this.setState({film,
                activePage:response.data.page,
                totalItemsCount:dataL,
                pageRangeDisplayed:response.data.total_pages
            })

            this.props.history.push({
                pathname: '/',
                search: "?page=" +pageNumber 
            })

            // console.log(dataL)
        })
      }

      buyProcess(price,id){
        
          const newsaldo  = Number(localStorage.getItem('saldo'))-price
          if(newsaldo > 0){
            this.state.isbought.push(id)
            this.setState({saldo:newsaldo})
            localStorage.setItem('idbuyyer',this.state.isbought)
            localStorage.setItem('saldo',newsaldo)
          }else{
            alert('saldo anda tidak cukup');
          }
          
          
      }

  render() {
    function Price(price) {
        if (price >= 0 && price <=3) {
          return 3500;
        }else if(price > 3 && price <=6){
            return 8250;
        }else if(price > 6 && price <=8){
            return 16350;
        }else if(price > 8 && price <=10){
            return 21250;
        }else{
            return 'Nan';
        }
        
      }
      
      function formatPrice(value) {
        let val = (value/1).toFixed().replace('.')
        return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const getIdbuyyer = localStorage.getItem('idbuyyer').split(',')
    return (
        // <h1>Dashboard</h1>
        <div>
            <div className='bg-container-layout'>
                <Carousel>
                    <Carousel.Item>
                        <img width='100%' alt='img' src="https://lumiere-a.akamaihd.net/v1/images/homepage_hero_incredibles_avengers_incinemas_aa66bcd2.jpeg?region=0,0,1920,800&width=1200&optimize=true" />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width='100%' alt='img' src="https://cq351v1dh3-flywheel.netdna-ssl.com/wp-content/uploads/2015/05/avengers-final.jpg" />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width='100%' alt='img' src="https://image.dynamixse.com/s/crop/1200x500/https://static.whereyat.com/whereyatcom_838986089.jpg" />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
            </div>
            <div className='bg-film-content'>
            <Grid>
                <h1 className='headlineFilm'>Sedang tayang</h1>
                        <Row >
                        {this.state.film.map((item) =>
                          <Col xs={12} md={2} className='p-b-20 height-300'>
                              <NavLink to={'/detail/'+item.id+'-'+item.title.toLowerCase().replace(/\s+/g, '-')}>
                              <img 
                              alt='img'
                              src={'https://image.tmdb.org/t/p/w500/'+item.poster_path}
                              width='100%'
                              height={250}
                              />
                              </NavLink>
                              <p className='m-0 p-t-10 height-50'>{item.title}</p>
                              <p className='m-0 p-b-10 idr-color'>{formatPrice(Price(item.vote_average))}</p>
                              {getIdbuyyer.includes(String(item.id))? 'telah dibeli' : <Button block 
                                    className='buy-button' 
                                    onClick={(e)=>{if(window.confirm('Yakin akan beli?')){
                                        this.buyProcess(Price(item.vote_average),item.id,e)
                                    }}} 
                                    > 
                                    Beli</Button>}
                          </Col>     
                        )}
                        
                        </Row>  
                        <div className='centerAlign'>
                            <div>
                                <Pagination
                                innerClass='pagination customPg font-default'
                                activePage={this.state.activePage}
                                
                                totalItemsCount={this.state.totalItemsCount}
                                onChange={this.handlePageChange}
                                />
                            </div>
                        </div>
                 
            </Grid>
            </div>
            <NavigationBar saldo={this.state.saldo}/>
        </div>
    );
  }
}

export default Dashboard;

