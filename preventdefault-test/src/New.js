onst Home =() =>
{
  return(
    <div>
    <p>
      This is Home
    </p>
  </div>
  );
  
}


const Airport=()=>
{
  return(
    <div>
    <ul>
      <li>Ahmedabad</li>
      <li>Delhi</li>
      <li>Mumbai</li>
      <li>Chennai</li>
      <li>Banglore</li>
    </ul>
  </div>

  );
  }


const City=()=>{
  return(
    <div>
    <ul>
      <li>Kanpur</li>
      <li> Delhi</li>
      <li>Guwhati</li>
      <li>Kolkata</li>
      <li>Bhuvneshwar</li>
    </ul>
  </div>
  );
  
}


<div>
       <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/airports">Airports</Link></li>
         <li><Link to="/cities">Cities</Link></li>
         <li><Link to="/user">User</Link></li>
       </ul>

       <Route exact path="/" component={Home} />
       <Route path="/airports" component={Airport} />
       <Route path="/cities" component={City} />
       <Route path="/user"  render={() => <div> <Airport /> </div>}/>
     </div>