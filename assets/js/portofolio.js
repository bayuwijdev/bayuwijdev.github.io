// Function to extract the ID from the URL
function getPortfolioId() {
    // Get the full URL
    const currentUrl = window.location.pathname;
    // Split the URL to get the ID
    const parts = currentUrl.split('/');
    // The ID will be the last part
    const id = parts[parts.length - 1];
    return id;
}
document.addEventListener("DOMContentLoaded", function () {
    const portfolioId = getPortfolioId();
    
    fetch('portfolio-datas.json')
        .then(response => {
            console.log(response); // Log the response to see if it's successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const portfolio = data.find(p => p.id === portfolioId);
            if (!portfolio) {
                throw new Error('Portfolio not found');
            }

            // Set the portfolio title
            const portfolioTitle = document.getElementById('portfolio-title');
            if (portfolioTitle) {
                portfolioTitle.textContent = portfolio.title;
            }            

            const swiperWrapper = document.querySelector('.swiper-wrapper');
            console.log(portfolio.images);

            if (portfolio.images && Array.isArray(portfolio.images)) {
                // if(portfolio.images.length > 1) {
                    portfolio.images.forEach(imageUrl => {
                        const swiperSlide = document.createElement('div');
                        swiperSlide.classList.add('swiper-slide');
    
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.alt = "";
    
                        swiperSlide.appendChild(img);
                        swiperWrapper.appendChild(swiperSlide);
                    });
                // } else {
                //     const img = document.createElement('img');
                //     img.src = portfolio.images[0];
                //     img.height = "270"
                //     img.width = "450"
                //     img.alt = "";
                //     console.log(img);
                //     document.getElementById('single_image').appendChild(img);
                // }
            }

            // Set the portfolio description
            const portfolioDescription = document.getElementById('portfolio-description');
            if (portfolioDescription) {
                portfolioDescription.textContent = portfolio.description;
            }

            const longDescription = document.getElementById('portfolio-long-description');
            if (longDescription) {
                longDescription.innerHTML = '';
                portfolio.details.forEach(paragraph => {
                  const p = document.createElement('p');
                  p.textContent = paragraph;
                  longDescription.appendChild(p);
                });
            }
            
            // // Set the testimonial details
            // // document.getElementById('testimonial-quote').querySelector('span').textContent = data.testimonial.quote;
            // // document.getElementById('testimonial-image').src = data.testimonial.image;
            // // document.getElementById('testimonial-author').querySelector('h3').textContent = data.testimonial.author;
            // // document.getElementById('testimonial-author').querySelector('h4').textContent = data.testimonial.role;

            // // Set the project information
            document.getElementById('portfolio-category').textContent = portfolio.info.category;
            document.getElementById('portfolio-tech-stack').textContent = portfolio.info.tech_stack;
            document.getElementById('portfolio-client').textContent = portfolio.info.client;
            document.getElementById('portfolio-date').textContent = portfolio.info.date;
            document.getElementById('portfolio-url').textContent = portfolio.info.url;
            const portfolioUrlElement = document.getElementById('portfolio-url');
            const portfolioUrlListItem = portfolioUrlElement.parentElement;

            if (portfolio.info.url) {
                portfolioUrlElement.href = portfolio.info.url;
                portfolioUrlElement.textContent = portfolio.info.url;
            } else {
                // Hide the <li> element if the URL is null or undefined
                portfolioUrlListItem.style.display = 'none';
            }
            // document.getElementById('portfolio-visit-btn').href = data.info.url;

            // Create and set the iframe
            const videoContainer = document.getElementById('portfolio-video');
            if (videoContainer && portfolio.info.video_url != null) {
                const iframe = document.createElement('iframe');
                iframe.width = "560";
                iframe.height = "315";
                iframe.src = portfolio.info.video_url;
                iframe.title = "YouTube video player";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowFullscreen = true;
                videoContainer.appendChild(document.createElement('br'))
                videoContainer.appendChild(iframe);
            }

        })
        .catch(error => {
            console.error('Error fetching portfolio data:', error);
            const portfolioContainer = document.getElementById('portfolio-container');
            portfolioContainer.innerHTML = '<p>Error loading portfolio data.</p>';
        });
});
