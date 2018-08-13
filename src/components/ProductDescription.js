import React from "react"

const ProductDescription = (props) => {
    this.descripcion = props.data;

    return (
        <div className="product-description">
            <h3>Descripción del producto</h3>
            <p>
                {this.descripcion.plain_text}
            </p>
        </div>
    )
}

export default ProductDescription;