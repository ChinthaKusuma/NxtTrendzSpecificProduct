// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {item} = props
  const {
    imageUrl,
    title,

    price,

    brand,
    totalReviews,
    rating,
  } = item
  console.log(price)
  return (
    <li className="container1">
      <img src={imageUrl} className="img3" alt="similar product" />
      <p>{title}</p>
      <p>by {brand}</p>
      <div>
        <p>Rs {price}</p>
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
      </div>
    </li>
  )
}
export default SimilarProductItem
