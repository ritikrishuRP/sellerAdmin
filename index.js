let totalValue = 0;

function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        sellingPrice: parseFloat(event.target.sellingPrice.value),
        product: event.target.product.value,
    };

    totalValue += userDetails.sellingPrice;

    axios.post(
            "https://crudcrud.com/api/44f46ebd9fa142de9790e93f6865b816/sellerAdmin",
            userDetails
        )
        .then((response) => {
            displayUserOnScreen(response.data);
            updateTotalValue();
        })
        .catch((error) => console.error(error));

    // Clearing the input fields
    document.getElementById("sellingPrice").value = "";
    document.getElementById("product").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/44f46ebd9fa142de9790e93f6865b816/sellerAdmin')
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                displayUserOnScreen(response.data[i]);
                totalValue += response.data[i].sellingPrice;
            }
            updateTotalValue();
        })
        .catch((error) => console.error('Error fetching user details:', error));
});

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.sellingPrice} - ${userDetails.product}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Product"));
    userItem.appendChild(deleteBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        const userId = userDetails._id;
        totalValue -= userDetails.sellingPrice;
        axios.delete(`https://crudcrud.com/api/44f46ebd9fa142de9790e93f6865b816/sellerAdmin/${userId}`)
            .then((response) => {
                userList.removeChild(userItem);
                updateTotalValue();
            })
            .catch((error) => {
                console.error('Error deleting user details:', error);
                // Update total value even if there's an error deleting the product
                updateTotalValue();
            });
    });
}

function updateTotalValue() {
    const totalValueElement = document.getElementById("totalValue");
    totalValueElement.textContent = totalValue.toFixed(2);
}

// Do not touch the code below
module.exports = handleFormSubmit;
