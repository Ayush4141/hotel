const stripe = Stripe('pk_test_51Ii1BOSEviyu8hyPnFhLhNK9rpY5beMmM8ihIiAhGUCyvRYWSZCuAmuV0QKmhYPNkU0T0ddde0W4t3eEEa9pRE6X00wA40FwHY');


const bookHotel = async hotelId => {
    try{
    // Get checkout session from api
//        console.log(hotelId);
    const session = await axios(`http://127.0.0.1:3000/api/bookings/checkout-session/${hotelId}`);
    console.log(session);

    //Create checkout form + charge credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.id
    });

    }catch(err){
        console.log(err);
    }
}

const bookBtn = document.getElementById('book-tour');

if(bookBtn){
  bookBtn.addEventListener('click', e=>{
    e.target.textContent ='Processing... ';
    const hotelId = e.target.dataset.hotelId;
//    console.log(hotelId);
    bookHotel(hotelId);
  } )
}