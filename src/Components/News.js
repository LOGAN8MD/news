import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    state = {
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0
    }

    capFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount() {
        document.title = `${this.capFirstLetter(this.props.category)} - newsOnTips`;
        this.updateNews();
    }

    updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12e4d330f4534ac7a3561f8c69692b61&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log("API Response:", parsedData); // Debugging API response

            if (!parsedData.articles) {
            throw new Error("No articles found in response");
        }
            
            this.setState({
                articles: parsedData.articles || [],
                totalResults: parsedData.totalResults || 0,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ articles: [], loading: false });
        }
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        const { articles, loading, page, totalResults } = this.state;

        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '50px' }}>newsOnTips - Top {this.capFirstLetter(this.props.category)}  Headlines</h1>
                {loading && <Spinner />}
                <div className='container d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
                <div className='row'>
                    {console.log(articles.length)}
                    {console.log("Deepak")}
                    {articles.length > 0 ? (
                        articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imgUrl={element.urlToImage ? element.urlToImage : ""}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No articles found</p>
                    )}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;


// import React, { Component } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';

// export class News extends Component {

//     static defaultProps={
//         country:'in',
//         pageSize:9,
//         category:'general'
//     }

//     static propTypes={
//         country :PropTypes.string,
//         pageSize:PropTypes.number,
//         category:PropTypes.string
//     }
//     capFirstLetter=(string)=>{
//         return string.charAt(0).toUpperCase()+string.slice(1);
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: false,
//             page:1
//         }
//         document.title=`${this.capFirstLetter(this.props.category)} - newsOnTips`;
//     }

//     async updateNews(pageNo){
       
//         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12e4d330f4534ac7a3561f8c69692b61&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({loading:true});
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         this.setState({ articles: parsedData.articles,
//             totalResults:parsedData.totalResults,
//           loading:false
//         })
        

//     }

//     async componentDidMount() {
//         this.updateNews();
//          }

//          handlePrevClick= async()=>{
//         this.setState({page:this.state.page - 1});
//         this.updateNews();
//          }

//          handleNextClick= async()=>{
//         this.setState({page:this.state.page + 1});
//         this.updateNews();
//         }



//     render() {
//         return (
//             <div className='container my-3'>
//              <h1 className='text-center' style={{margin:'35px 0px',marginTop:'50px'}}>newsOnTips - Top {this.capFirstLetter(this.props.category)}  Headlines</h1>
//                {this.state.loading&&<Spinner />}
//                 <div className='container d-flex justify-content-between'>
//                 <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
//                 <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
//                 </div>
//                 <div className='row'>
//                     {!this.state.loading && this.state.articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem
//                                 title={element.title ? element.title : ""}
//                                 description={element.description ? element.description : ""}
//                                 imgUrl={element.urlToImage ? element.urlToImage : ""}
//                                 newsUrl={element.url}
//                                 author={element.author} date={element.publishedAt}
//                                 source={element.source.name}
//                                 />
//                             </div>
//                       })}
//                 </div>
//                 <div className='container d-flex justify-content-between'>
//                 <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
//                 <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News
