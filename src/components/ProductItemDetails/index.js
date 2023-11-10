// Write your code here
import {Component} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import {} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {api: '', list1: {}, quantity: 0}

  componentDidMount() {
    this.setState({
      api: apiStatus.inProgress,
    })
    this.getProductDetails()
  }

  successView = () => {
    this.setState({
      api: apiStatus.success,
    })
  }

  failureView = () => {
    console.log('failure')
    this.setState({
      api: apiStatus.failure,
    })
  }

  failure1 = () => (
    <div className="one123">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="img123"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button className="btn1" type="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        description: data.description,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
          title: each.title,
          style: each.style,
          price: each.price,
          description: each.description,
          brand: each.brand,
          totalReviews: each.total_reviews,
          rating: each.rating,
          availability: each.availability,
        })),
      }

      this.setState({
        list1: updatedData,
      })
      this.successView()
    } else {
      console.log('false')
      this.failureView()
    }
  }

  loader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  decrease = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  increase = () => {
    const {quantity} = this.state
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  suceess = () => {
    const {list1, quantity} = this.state
    console.log(quantity)

    const {
      id,
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      similarProducts,
    } = list1
    return (
      <>
        <div className="one1">
          <img src={imageUrl} alt="product" className="img1" />
          <div>
            <h1>{title}</h1>
            <p>Rs.{price}/-</p>
            <div className="one">
              <button className="btn1" type="button">
                <p> {rating}</p>
                <div className="two">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="img2"
                  />
                </div>
              </button>
              <p>{totalReviews} References</p>
            </div>
            <p>{description}</p>
            <p>
              <span>Available:</span> {availability}
            </p>
            <p>
              <span>Brand:</span> {brand}
            </p>
            <hr />
            <div className="one2">
              <button
                type="button"
                className="btn2"
                data-testid="minus"
                onClick={this.decrease}
              >
                <BsDashSquare className="oneTwo" />
              </button>

              <p className="para">{quantity}</p>
              <button
               type="button"
                className="btn2"
                onClick={this.increase}
                data-testid="plus"
               
              >
                <BsPlusSquare className="oneTwo" />
              </button>
            </div>
            <button className="btn12" type="button">
              Add to Cart
            </button>
          </div>
        </div>
        <h1 className="heading1">Similar Products</h1>
        <ul className="container2">
          {similarProducts.map(each => (
            <SimilarProductItem item={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  getProductsDetails = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.inProgress:
        return this.loader()
      case apiStatus.success:
        return this.suceess()
      case apiStatus.failure:
        return this.failure1()
      default:
        return null
    }
  }

  render() {
    // const {similarProducts} = list1
    return (
      <>
        <Header />
        <div>{this.getProductsDetails()}</div>
      </>
    )
  }
}

export default ProductItemDetails
