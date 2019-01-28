import React, { Component } from 'react';
import {Grid,Row,Col,Table,Button} from 'react-bootstrap';
import { API_KEY, PATH_BASE, PATH_MOVIE, PATH_PAGE,LANGUAGE } from '../api';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Axios from 'axios';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: this.props.match.params.id.split('-')[0],
        smiliarfilm:[],
        recomfilm:[],
        isbought:localStorage.getItem('idbuyyer').split(','),
        // isbought:[],
        localBuyyer:[]
    }

    this.handleChange = this.handleChange.bind(this); 
    this.buyProcess = this.buyProcess.bind(this);
    if(localStorage.getItem('saldo')==null){
      localStorage.setItem('saldo',100000);
    } 
  
    if(localStorage.getItem('idbuyyer')==null){
        localStorage.setItem('idbuyyer','0');
    }
  }

  handleChange() {
    Axios.get(`${PATH_BASE}${PATH_MOVIE}/${this.state.id}?api_key=${API_KEY}&${LANGUAGE}en-US`)
      .then((response)=>{
          this.setState({
            title:response.data.title,
            adult:response.data.adult,
            language:response.data.spoken_languages['0'].name,
            overview:response.data.overview,
            path_image:response.data.poster_path,
            runtime:response.data.runtime,
            rating:response.data.vote_average,
            year:response.data.release_date.split('-')[0]
          })

      })
  }

  buyProcess(price,id){
        
    const newsaldo  = Number(localStorage.getItem('saldo'))-price
      if(newsaldo > 0){
        
        this.state.isbought.push(id)
        this.setState({saldo:newsaldo})
        console.log(this.state.isbought)
        localStorage.setItem('idbuyyer',this.state.isbought)
        localStorage.setItem('saldo',newsaldo)
        window.location.reload()
      }else{
        alert('saldo anda tidak cukup');
      }
    
}
  
  componentWillReceiveProps (newProps) {
 
    const newId = newProps.match.params.id.split('-')[0];
    if(newId!=null){
      this.setState({id:newId})
      window.location.reload()
    }
    
  }
  componentDidMount(){
    
      Axios.get(`${PATH_BASE}${PATH_MOVIE}/${this.state.id}?api_key=${API_KEY}&${LANGUAGE}en-US`)
      .then((response)=>{
          this.setState({
            title:response.data.title,
            adult:response.data.adult,
            language:response.data.spoken_languages['0'].name,
            overview:response.data.overview,
            path_image:response.data.poster_path,
            runtime:response.data.runtime,
            rating:response.data.vote_average,
            year:response.data.release_date.split('-')[0]
          })

      })

      Axios.get(`${PATH_BASE}${PATH_MOVIE}/${this.state.id}/similar?api_key=${API_KEY}`)
      .then((response)=>{
          const smiliarfilm = response.data.results
          this.setState({smiliarfilm})

      })

      Axios.get(`${PATH_BASE}${PATH_MOVIE}/${this.state.id}/recommendations?api_key=${API_KEY}&${LANGUAGE}en-US&${PATH_PAGE}1`)
      .then((response)=>{
          const recomfilm = response.data.results
          this.setState({recomfilm})

      })

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
        <div className='detail-content'>
           <Grid className='contentDetail'>
              <Row >
                <Col xs={12} md={3} className='p-b-20'>
                    <img 
                    alt='img'
                    src={'https://image.tmdb.org/t/p/w500'+this.state.path_image}
                    width='100%'
                    />
                </Col>
                <Col xs={12} md={8}>
                    <h2 className='title-detail font-default'>
                    {this.state.title}
                    </h2>
                    <p>{this.state.runtime} menit .{this.state.adult?'D':'Umum'}. {this.state.year}</p>
                    <p>{this.state.language}</p>
                    <p>{this.state.overview}</p>
                    <Table responsive>
                       <tbody>
                        <tr>
                          <td>Rating</td>
                          <td>{this.state.rating}</td>
                        </tr>
                    
                        <tr>
                          <td>Durasi</td>
                          <td>{this.state.runtime} menit</td>
                        </tr>
                      
                        <tr>
                          <td>Harga</td>
                          <td>{formatPrice(Price(this.state.rating))}</td>
                        </tr>
                      </tbody>
                      </Table>
                    <Col xs={3} className='p-0'>
                    {getIdbuyyer.includes(String(this.state.id))? 'telah dibeli' : <Button block 
                        className='buy-button' 
                        onClick={(e)=>{if(window.confirm('Yakin akan beli?')){
                            this.buyProcess(Price(this.state.rating),this.state.id,e)
                        }}} 
                        > 
                        Beli</Button>}  
                      </Col>
                </Col>
              </Row>
              
          </Grid>
          <Grid>
          <Row >
              <Col xs={12} className='p-b-20'>
                <h1 className='headlineFilm'>Judul Serupa</h1>
                  {this.state.smiliarfilm.map((item) =>
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
                    <div className='centerAlign'>
                    
                    </div>
                </Col>
                <Col xs={12} className='p-b-20'>
                <h1 className='headlineFilm'>Rekomendasi Film</h1>
                {this.state.recomfilm.map((item) =>
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
                    <div className='centerAlign'>
                    
                    </div>
                </Col>
              </Row>  
          </Grid>
        </div>
    );
  }
}

export default Detail;