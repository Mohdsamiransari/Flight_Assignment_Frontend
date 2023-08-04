import {useState } from "react";
function App() {

  const [originLocationCode, setOriginLocationCode] = useState("");
  const [destinationLocationCode, setDestinationLocationCode] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [post, setPosts] = useState("");

  const flightPrice = async (
    originLocationCode,
    destinationLocationCode,
    departureDate
  ) => {
    await fetch("http://localhost:4000/api/v1/flight/price", {
      method: "POST",
      crossDomain: "true",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        originLocationCode: originLocationCode,
        destinationLocationCode: destinationLocationCode,
        departureDate: departureDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setOriginLocationCode("");
        setDestinationLocationCode("");
        setDepartureDate("");
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    flightPrice(originLocationCode, destinationLocationCode, departureDate);
  };

  console.log(post)
  
 

  
 
  return (
    <main className="w-full h-full flex flex-col items-center  gap-6">
      <section className="xl:w-8/12 w-11/12  h-32  grid gap-4 mt-24">
        <div className="flex gap-4 w-1/3 h-4/5 text-gray-400">
          <select className="w-full bg-transparent cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 px-2 rounded-[4px] ">
            <option>One way</option>
            <option>Round trip</option>
            <option>Multi city</option>
          </select>
          <select className=" bg-transparent cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 px-6 rounded-[4px]">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select className="w-full bg-transparent cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 px-2 rounded-[4px]">
            <option>Economy</option>
            <option>Buisness</option>
            <option>First</option>
          </select>
        </div>
        <form
          className="flex  w-full gap-6 justify-between text-white"
          onSubmit={handleSubmit}
        >
          <div className=" basis-full flex gap-4  ">
            <input
              type="text"
              placeholder="Where from"
              className="overflow-hidden border border-[#5f6368] rounded-[4px] bg-transparent appearance-none pl-[52px] pr-[24px] w-full hover:border-white "
              value={originLocationCode}
              onChange={(e)=>setOriginLocationCode(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Where to"
              className="overflow-hidden border border-[#5f6368] rounded-[4px] bg-transparent appearance-none pl-[52px] pr-[24px] w-full hover:border-white"
              value={destinationLocationCode}
              onChange={(e)=>setDestinationLocationCode(e.target.value)}
              required
            />
          </div>
          <input
            type="date"
            className="basis-2/5 border border-[#5f6368] rounded-[4px] bg-transparent appearance-none px-12 hover:border-white"
            value={departureDate}
              onChange={(e)=>setDepartureDate(e.target.value)}
              required
          />
          <button type="submit" >search</button>
        </form>
      </section>
      <div className="xl:w-8/12 w-11/12 h-[0.5px] bg-gray-400"></div>
      <section className="xl:w-8/12 w-11/12 h-fit py-6 text-[#e8eaed]">
        <h2 className="text-[20px] font-semibold">Best flights</h2>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Search on the basis of IATA Code. Such as Mumbia (BOM) and Delhi (DEL)
          </p>
          <button className="text-[#8ab4f8] px-4 py-1 hover:bg-gray-400 hover:bg-opacity-10 rounded-[4px] text-[0.875rem]">
            Sort by:
          </button>
        </div>
        <ul className="divide-y-[1px] border rounded-[4px] mt-4">
          
          {post.success ===true ?(

            <li>{post.data.map((i)=>(
              <li className=" flex  p-4 justify-around  items-center gap-4" key={i.id}>
                <div className="basis-1/5"></div>
                <div className="basis-full flex flex-col">
                  <h2 className="text-sm">{new Date(i.itineraries[0].segments[0].departure.at).toLocaleTimeString('en-Us')} - {new Date(i.itineraries[0].segments[0].arrival.at).toLocaleTimeString('en-Us')}</h2>
                  <p className="text-gray-400 text-xs ">Air India</p>
                </div>
                <div className="basis-3/5">
                  <h2>2 hr 15 min</h2>
                  <p className="text-gray-400 text-xs ">BOM - DEL</p>
                </div>
                <div className="basis-3/5">Nonstop</div>
                <div className="basis-2/5">{(i.price.total)*90 } Rs</div>
              </li>
            ))}</li>
          )
          
          :""}
          
        </ul>
      </section>
    </main>
  );
}

export default App;
