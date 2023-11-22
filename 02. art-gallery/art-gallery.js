class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = {
            "picture": 200,
            "photo": 50,
            "item": 250,
        };
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        if (!this.possibleArticles.hasOwnProperty(articleModel.toLowerCase())) {
            throw new Error("This article model is not included in this gallery!");
        }
        for (let article of this.listOfArticles) {
            if (article.articleName === articleName && article.articleModel === articleModel) {
                article.quantity += quantity;
                return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
            }
        }
        this.listOfArticles.push({ articleModel: articleModel.toLowerCase(), articleName, quantity });
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`
    }

    inviteGuest(guestName, personality) {
        for (let guest of this.guests) {
            if (guest.guestName === guestName) {
                throw new Error(`${guestName} has already been invited.`);
            }
        }
        let points = 0;
        if (personality === 'Vip') {
            points = 500;
        } else if (personality === 'Middle') {
            points = 250;
        } else {
            points = 50;
        }
        this.guests.push({
            guestName,
            points,
            purchaseArticle: 0,
        })
        return `You have successfully invited ${guestName}!`;
    }

    buyArticle(articleModel, articleName, guestName) {
        let currArticle = this.listOfArticles.find(x => x.articleName === articleName);
        let guest = this.guests.find(x => x.guestName === guestName);

        if (!currArticle || (currArticle && currArticle.articleModel !== articleModel)) {
            throw new Error('This article is not found.');
        }

        if (currArticle.quantity === 0) {
            return `The ${articleName} is not available.`;
        }

        if (!guest) {
            return "This guest is not invited.";
        }

        if (guest.points < this.possibleArticles[currArticle.articleModel]) {
            return "You need to more points to purchase the article.";
        }
        guest.points -= this.possibleArticles[currArticle.articleModel];
        currArticle.quantity--;
        guest.purchaseArticle++;

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[currArticle.articleModel]} points.`
    }

    showGalleryInfo(criteria) {
        let result = [];
        if (criteria === 'article') {
            result.push('Articles information:');
            this.listOfArticles.forEach(x => result.push(`${x.articleModel} - ${x.articleName} - ${x.quantity}`));
        } else if (criteria === 'guest') {
            result.push('Guests information:');
            this.guests.forEach(x => result.push(`${x.guestName} - ${x.purchaseArticle}`));
        }
        return result.join('\n');
    }
}