import React, { Component } from "react"

import ProductDescription from "./ProductDescription"
export class Producto extends Component {


    constructor(props) {
        super(props);
        this.product_id = props.match.params.id;
        this.producto_condition = "";
        this.product_data = [];
        this.product_description = [];
        this.product_images = []
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        console.log(this.state)
        this.getProductData()
        this.getProductDescription()
    }

    getProductData = function (id) {
        fetch("https://api.mercadolibre.com/items/" + this.product_id)
            .then(res => res.json())
            .then(
                (result) => {
                    var imagenes = []
                    result.pictures.forEach(img => {
                        imagenes.push(img.url)
                    });
                    this.product_data = result
                    this.product_images = imagenes
                    this.producto_condition = result.condition
                    this.setState({
                        isLoaded: true,
                    });



                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getProductDescription = function () {
        fetch("https://api.mercadolibre.com/items/" + this.product_id + "/description")
            .then(res => res.json())
            .then(
                (result) => {

                    this.product_description = result
                    this.setState({
                        isLoaded: true,
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 galery-container">
                        <img className="img-fluid" src={this.product_images[0]} alt="" />
                        <div className="row">
                            <ProductDescription data={this.product_description} />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <span className="product-status">
                            <span>{this.producto_condition === "new" ? 'Nuevo' : 'Usado'} - </span>
                            <span>{this.product_data.sold_quantity} Vendidos</span>
                        </span>
                        <h1 className="product-title">{this.product_data.title}</h1>
                        <h2 className="product-price">$ {this.product_data.price}</h2>
                        <div className="product-btn-container">
                            <a className="btn btn-lg btn-comprar">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Producto;