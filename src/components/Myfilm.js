import React, { Component } from 'react';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { API_KEY, PATH_BASE,PATH_MOVIE,LANGUAGE} from '../api';
import '../App.css';

class Myfilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            film:[],
        }
    }

    componentDidMount(){
        for(let i = 1;i<localStorage.getItem('idbuyyer').split(',').length;i++){
            const filmid= localStorage.getItem('idbuyyer').split(',')[i]
            Axios.get(`${PATH_BASE}${PATH_MOVIE}/${filmid}?api_key=${API_KEY}&${LANGUAGE}en-US`)
            .then((response)=>{
                const ddata = {
                    id:response.data.id,
                    title:response.data.title,
                    overview:response.data.overview,
                    path_image:response.data.poster_path,
                }

                console.log(response.data.id)
                this.setState({film:[...this.state.film,ddata]})
            })

            
            
        }
    }

  render() {
    return (
      <div>
      <div className='bg-container-layout'>
      <Grid>
        <h1 className='headlineFilm'>Daftar Film Saya</h1>
        <Row >
        {this.state.film.map((item) =>
            <Col xs={12} md={2} xs={4} className='p-b-20 height-300'>
                <NavLink to={'/detail/'+item.id+'-'+item.title.toLowerCase().replace(/\s+/g, '-')}>
                <img 
                alt='img'
                src={'https://image.tmdb.org/t/p/w500/'+item.path_image}
                width='100%'
                height={250}
                />
                </NavLink>
                <p className='m-0 p-t-10 height-50'>{item.title}</p>
                {'telah dibeli'}
            </Col>     
        )}
        
        </Row>  
        </Grid>

      </div>
      </div>
    );
  }
}

export default Myfilm;