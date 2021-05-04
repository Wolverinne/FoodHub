
let visitCount=localStorage.getItem('visitCount');
console.log(visitCount);
    //Iterating over the localStorage and getting the previous orders.
    //The loop executes untill the newest order( VisitCount) Number.
    if(visitCount<=12)
    {
        console.log('in if');
        for(let i=1;i<=visitCount;i++)
        {
        //Get the itemsOrdered Data from localStorage and first parse it.
        let data=JSON.parse(localStorage.getItem('itemsOrderedOnVisitNumber_'+i));

        //append the data in to the inner html of the body to display previous orders and their respective dates.
        document.getElementById('orders').innerHTML+=`
        <ul>
            <h3>
                <span>Items Ordered On :</span>
                 ${data.date}
            </h3>
            ${data.items}
        </ul>
        `;
        };
    }
    else{
        console.log('in else');
        document.getElementById('orders').innerHTML+=`
                    <div class="loyalty_cards ">
                        Your Orders are currently not available. <br/>
                        Visit again after some time.
                        <br/>
                        <br/>
                        <strong>Happy Fooding.!</strong>
                    </div>
        `;
    }
    
document.querySelector('.clear_visitCount_local_storage').addEventListener('click',()=>{
    localStorage.removeItem('visitCount');
});
