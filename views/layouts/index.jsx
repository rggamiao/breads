const React = require('react')
const Default = require('./layouts/Default.jsx')
const breads = require('../controllers/breads_controller.js')
const { title } = require('process')

function Index ({breads, title, bakers})  {
    return (
    <Default title = {title}>
        <h2>Index Page</h2>
        <h3>Bakers</h3>
        <ul>
            {
                bakers.map((baker)=> {
                    return (
                        <li key={baker._id}>
                            <a href={`/bakers/${baker._id}`}>{baker.name}</a>
                        </li>
                    )
                })
            }
        </ul>
        <h3>Breads</h3>
        <ul>
        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>
        {
            breads.map((bread, index)=> {
                return (
                <li key={index}>
                    <a href={`/breads/${bread._id}`}>
                        {bread.name}
                    </a>
                </li>
                )
            })
        }
        </ul>
    </Default>
      
    )
}

module.exports = Index


        