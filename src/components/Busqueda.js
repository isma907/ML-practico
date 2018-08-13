import React, { Component } from "react"
import ProductList from "./ProductList"
import queryString from 'query-string'

export class Busqueda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            productos: []
        };
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        var query = values.search;
        if (query) this.buscar(query);
    }

    buscar = function (query) {
        fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query + "&limit=4")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        isLoaded: true,
                        productos: result.results
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
                {this.state.productos.map((producto, i) => (
                    <ProductList key={i} data={producto} />
                ))}
            </div>
        )
    }

}

export default Busqueda;