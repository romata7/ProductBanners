const Product = () => {
    return (
        <div>
            <h5>Producto</h5>
            <div className="d-flex gap-2">
                <div className="input-group mb-2">
                    <span className="input-group-text">Ancho</span>
                    <input type="number" className="form-control" />
                    <select name="" id="" className="form-select">
                        <option value="m">Metros</option>
                        <option value="cm">Centímetros</option>
                    </select>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Alto</span>
                    <input type="text" className="form-control" />
                    <select name="" id="" className="form-select">
                        <option value="m">Metros</option>
                        <option value="cm">Centímetros</option>
                    </select>
                </div>
            </div>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" placeholder="" />
                <label htmlFor="">Descripción</label>
            </div>
            <div className="d-flex gap-2">
                <div className="input-group mb-2">
                    <span className="input-group-text">Cant</span>
                    <input type="number" className="form-control" />
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text">Costo S/.</span>
                    <input type="text" className="form-control" />
                </div>
            </div>
            
            <div className="d-flex gap-2 mb-2 mt-2">
                <div className="input-group mb-2"></div>
                <div className="input-group mb-2">
                    <span className="input-group-text fw-bold">Total S/.</span>
                    <input type="text" className="form-control" />
                </div>

            </div>
        </div>
    );
}

export default Product;