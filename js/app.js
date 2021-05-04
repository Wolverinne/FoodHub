//Menu Dishes
const menuItems={
    veg:{
        0:{
            name:'Baingan Ka Bharta',
            image:'./assets/veg-dishes/baingan-bharta.png'
        },
        1:{
            name:'Chole Masala',
            image:'./assets/veg-dishes/chole-masala.png'
        },
        2:{
            name:'Mix Vegetable',
            image:'./assets/veg-dishes/mix-veg.png'
        },
        3:{
            name:'Rajma Masala',
            image:'./assets/veg-dishes/rajma-masala.png'
        },
        4:{
            name:'Shahi Paneer',
            image:'./assets/veg-dishes/shaahi-paneer.png'
        },
        5:{
            name:'Dal Makhani',
            image:'./assets/veg-dishes/dal-makhni.png'
        }
    },
    nonveg:{
        0:{
            name:'Achaari Chicken',
            image:'./assets/nonveg-dishes/achari-chicken.png'
        },
        1:{
            name:'Butter Chicken',
            image:'./assets/nonveg-dishes/butter-chicken.png'
        },
        2:{
            name:'Chicken Biryani',
            image:'./assets/nonveg-dishes/chicken-biryani.png'
        },
        3:{
            name:'Chicken Cutlet',
            image:'./assets/nonveg-dishes/chicken-cutlet.png'
        },
        4:{
            name:'Mutton Korma',
            image:'./assets/nonveg-dishes/mutton-korma.png'
        },
        5:{
            name:'Tandoori Chicken',
            image:'./assets/nonveg-dishes/tandoori-chicken.png'
        }
    },
    fastfood:{
        0:{
            name:'Spring Roll',
            image:'./assets/fastfood/spring-roll.png'
        },
        1:{
            name:'Burger',
            image:'./assets/fastfood/burger.png'
        },
        2:{
            name:'Chilli Potato',
            image:'./assets/fastfood/chilli-potato.png'
        },
        3:{
            name:'Veg Momos',
            image:'./assets/fastfood/momos.png'
        },
        4:{
            name:'Veg Noodles',
            image:'./assets/fastfood/noodles.png'
        },
        5:{
            name:'Pizza Mania',
            image:'./assets/fastfood/pizza.png'
        }
    }
    
};

//Checks for visit count if it exists.
//If visit count does not exist then it returns null.

let visitCount=localStorage.getItem('visitCount');
console.log(visitCount);

const incrementVisitCount=()=>{
    //If null is returned we just initialize the visit count with value=1.
    if(visitCount==null || visitCount>11){
        visitCount=1;
        localStorage.setItem('visitCount',visitCount);
    }

    //Now every time when visitCount it checked in the local storage then the value gets incremented y 1.
    else{
        visitCount++;
        localStorage.setItem('visitCount',visitCount);
    }
};

//Store the respective order items and associated date in the local storage.
const itemsOrderWithDate=()=>{
    const itemsOrderedOnVisitNumber={
        date:document.querySelector('.form_date_input').value,
        items:document.getElementById('container_ordered_items').innerHTML
    }
    localStorage.setItem('itemsOrderedOnVisitNumber_'+visitCount,JSON.stringify(itemsOrderedOnVisitNumber));
    setTimeout(()=>{
            alert('Visit Added Successfully.');
            window.open();
    },10);
    document.querySelector('.form_date_input').value='';
    document.getElementById('container_ordered_items').innerHTML='';
};


//Scroll Into the menu when explore menu button is clicked in the header image
const scroll_to_menu_btn=document.querySelector('.header_button');
    scroll_to_menu_btn.addEventListener('click',()=>{
        document.getElementById('menu_items').scrollIntoView();
    });

//An optimised approach for Iterating through each menu item object and inject the dish items code into the html
//Menu items Section
const createDishItems=(category,append)=>{
    for(let i in category){
        append.innerHTML+=`
        <div class="dishItems">
            <div class="item-body">
                <img class="items_cover_image" src=${category[i].image} />
                <h1 class="items_title">${category[i].name}</h1>
            </div>
         </div>
         `;
    };
};
createDishItems(menuItems.fastfood,document.querySelector('.fastfood_items'));
createDishItems(menuItems.nonveg,document.querySelector('.nonveg_items'));
createDishItems(menuItems.veg,document.querySelector('.veg_items'));


//Toggle the Dishes Button in the menu_items section
let toggleMenuDishButtonArray = document.getElementsByClassName("toggle_items");

//Here we iterate over all the HTMLCollection array of toggle_items class
for (let i = 0; i < toggleMenuDishButtonArray.length; i++) 
{
    toggleMenuDishButtonArray[i].addEventListener("click", function() 
    {
    //Add class active to the element that was clicked.
     //Here This refers to the element that triggered the click event.
    this.classList.toggle("active");
    //The very next sibling member of the callee function .
    let dishes = this.nextElementSibling;
    if (dishes.style.display === "grid") 
    {
      dishes.style.display = "none";
      setTimeout(function(){
        dishes.style.opacity='0';
      },10);
      this.children[1].innerHTML='&darr;';
    }
     else 
     {
        dishes.style.display = "grid";
         //The dish items will appear in a fadeIn fashion transition
      setTimeout(function(){
        dishes.style.opacity='1';
      },10);
      this.children[1].innerHTML='&uarr;';
    }
  });
};

const orderedItems=document.getElementById('container_ordered_items');
const orderItemsBtn=document.querySelector('.order_items_btn');
const submit_form=document.querySelector('.submit_visit_data_btn');
const add_visit=document.querySelector('.add_visit_btn');
const loyalty_timeline=document.getElementById('loyalty_timeline');
const redeem_menu=document.querySelectorAll('.redeemMenu');
const loadMoreCards=document.querySelector('.load_more_cards');


//FUnction to redeem any veg dish from redeem coupon.
const addRedeemItemsVeg=()=>{
    if(event.target.classList.contains('redeemBtn'))
    {
        console.log(event.target.parentElement.parentElement.classList);

        //Add the redeem items to order List.
        addItemsToOrderList(event.target.parentElement.children[0].textContent);
    }
    //Remove the click event handler once an item has been redeemed.
    redeem_menu[0].removeEventListener('click',addRedeemItemsVeg);
};
//FUnction to redeem any Nonveg dish from redeem coupon.
const addRedeemItemsNonVeg=()=>{
    if(event.target.classList.contains('redeemBtn'))
    {
        console.log(event.target.parentElement.parentElement.classList);

        //Add the redeem items to order List.
        addItemsToOrderList(event.target.parentElement.children[0].textContent);
    }
    //Remove the click event handler once an item has been redeemed.
    redeem_menu[1].removeEventListener('click',addRedeemItemsNonVeg);
};
//FUnction to redeem any FastFood item from redeem coupon.
const addRedeemItemsFastFood=()=>{
    if(event.target.classList.contains('redeemBtn'))
    {
        console.log(event.target.parentElement.parentElement.classList);

        //Add the redeem items to order List.
        addItemsToOrderList(event.target.parentElement.children[0].textContent);
    }
    //Remove the click event handler once an item has been redeemed.
    redeem_menu[2].removeEventListener('click',addRedeemItemsFastFood);
};

//FUnction to redeem any of the veg non vg and fastfood item mentioned in the redeem coupon.
const addRedeemItemsMix=()=>{
    if(event.target.classList.contains('redeemBtn'))
    {
        console.log(event.target.parentElement.parentElement.classList);

        //Add the redeem items to order List.
        addItemsToOrderList(event.target.parentElement.children[0].textContent);
    }
    //Remove the click event handler once an item has been redeemed.
    redeem_menu[3].removeEventListener('click',addRedeemItemsMix);
};

//Attach click event handler to the redeem items on redeem coupon in loyalty timeline.
redeem_menu[0].addEventListener('click',addRedeemItemsVeg);
redeem_menu[1].addEventListener('click',addRedeemItemsNonVeg);
redeem_menu[2].addEventListener('click',addRedeemItemsFastFood);
redeem_menu[3].addEventListener('click',addRedeemItemsMix);

//This function will add the inputted order items in the list.
//You click on order button and the item will be added to the order.
const addItemsToOrderList=(orderItem)=>{
    console.log(orderItem);
        if(orderItem.length>1){
            orderedItems.innerHTML+=`
            <li class='listItem'>
                    <p class='listContent'>${orderItem}</p>
                     <button class='closeBtn'> X</button>
            </li>
            `;
            document.querySelector('.order_items_input').value=' ';
        }
};


const createNodeElement=(childElement)=>{
    return document.createElement(childElement);
}
const appendChildNodeToParent=(parentElement,childElement)=>{
    return parentElement.appendChild(childElement);
}

const addClassNameToElement=(element,className)=>{
    return element.classList.add(className);
}

    //Add a click event on submit button on the add_visit form
    submit_form.addEventListener('click',()=>
    {
        if(document.querySelector('.form_date_input').value!=='' && document.querySelector('.order_items_input').value!=='')
        {
            itemsOrderWithDate();
        }
        else{
            alert('Enter Visit date and Order Some Items');
        }
        
    });

    //This will generate the ordered Items list in the add visit form
    orderItemsBtn.addEventListener('click',()=>{
        addItemsToOrderList(document.querySelector('.order_items_input').value);
    });

    //If we want to delete an ordered item on clicking on the cross button we can delete it.
    const deleteListItem=(eventObject)=>{
        eventObject.preventDefault();
        if(eventObject.target.classList.contains('closeBtn'))
        {
            if(confirm('Are You Sure About That??'))
            {
                eventObject.target.parentNode.remove();
            }
        }
    };
        //Attach a click event to the Delete Item Button
        orderedItems.addEventListener('click',deleteListItem);

        //Attach a click event handler to the add_visit button.
        //When we click on this button then the add_visit form will appear.
        add_visit.addEventListener('click',()=>{
            incrementVisitCount();
            document.querySelector('.add_visit_form').style.display='flex';
            setTimeout(()=>{
                document.querySelector('.add_visit_form').style.opacity='1';
            },10);
            loyalty_timeline.children[visitCount-1].style.display='flex';
            setTimeout(()=>{
                loyalty_timeline.children[visitCount-1].style.opacity='1';
            },10);
        });

       