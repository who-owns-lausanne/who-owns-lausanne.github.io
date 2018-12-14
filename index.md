---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

---

Finding an apartment in Lausanne with a rent that fits a student budget is a
time-consuming and tedious task. If you have just arrived in Lausanne, you don't
know where to look. Is it cheaper on the hill or near the university? You don't
know all the parameters that come into play and while running from one flat
viewing to another you start to wonder, who owns all this real estate you would
like to live in?

#### Goal

We want to bring some light into the opaque world of real estate. By leveraging
openly accessible data our goal is to understand **how rent prices are
influenced by the type of the owner, the geographical situation or other
factors**. This article should serve as a head start for people searching
affordable rents in Lausanne.

#### Key insights

In particular you will get enlightened about the real estate insights listed
below and you will understand how those were obtained. Even if Lausanne is not
New York we needed to think of it in smaller units. Therefore, our results
divide the city into its neighbourhoods – in french
[_quartiers_][quartiers_lausanne].

- We evaluated the mean rents per _quartier_  and can therefore say that the
  _quartiers_  _Montriond_ and _Ouchy_  are clearly more expensive
  than the rest.

- For each _quartier_, we analysed its ownership pattern. This means we know
  what type of owner possesses the most properties and also how diverse the
  owners of _quartier_ are. For example the centre is mainly owned by
  corporations.

- Even if some parts of the city are owned by different types of owners, there
  is no direct relation between owner type and prices. The market seems to
  adjust prices uniformly over the ownership types.

- However, the height of a rent is strongly influenced by the distance to the
  lake Geneva and by the inverse surface of the flat. Smaller flats cost more
  per square meter than large flats.


{% include question.html in_text=true
  text="Who owns your quartier?"
  image_url="assets/img/3245402894_9a4e7ef640_o.jpg"
%}


Our first [dataset][asit] consists of the geographical, [cadastral] and address
data behind [map.lausanne.ch](https://map.lausanne.ch) It features the owner of
each of the almost 8000 plots or parcels (of land) of the city (unless the
parcel represents a road or a bridge). There are about 4000 entities possessing
real estate and they as diverse as you would imagine them ranging from the city
council, to private people and even multinational companies like Crédit Suisse,
Phillip Morris International or the pension fund of Swatch.[^1]

[^1]:  
    This number does not account for PPE (_prorpiété par étage_). If a house's
    flats are owned by individuals the dataset does not distinguish the
    different owners. It just indicates PPE.


#### Ownership types

The owner with the most parcels is unsurprisingly the **city of Lausanne**. With
1265 parcels it owns ten times more than the next two owners which are both
pension funds; of the city and of the canton Vaud. Because most owners only have
a small amount of parcels we will group them into 7 types:

 - public institutions: _the city, the swiss railways etc._

- pension or similar funds: _investment foundations,the city's pension fund,
  etc._

 - corporations: _listed public companies like Swiss Life S.A., Régie Chamot &
   Cie S.A. etc._

 - cooperatives: _registered cooperative companies like Migros, la Mobilière etc._

 - foundations and associations: _for example the olympic foundation for
    cultural heritage._

 - PPE: _a swiss thing: single flats owned by private people – in french_
   proriété par étage.

 - individual privates: _just normal people like you and me._


If we look at the data as a map a very noisy mosaic shows up.

##### => noisy ownership type by parcel map

#### Denoising

If you just squinted while looking at the map we have the same intuition. The
mosaic is too chaotic to say anything. Therefore, we try to smoothen the picture
–  digitally. For each parcel we drew an imaginary circle through its
neighbouring parcels and looked at their ownership type. The cell was then
reassigned to the type which covered the most of the circle's surface. This can
be seen as a weighted [k-nearest-neighbours] algorithm with variable _k_.


##### => denoised ownership type by parcel map


With this cleaner picture, we looked at the majority owner for each quartier.

##### => Count biggest owner types per quartier

#### Diversity

The fact that the two maps are different shows that there is a lot of
diversity in some _quartiers_' ownership patterns. In order to see which
_quartiers_ are the most diversely owned, we computed another map that measures
the diversity based on the entropy.

##### => exact measure and map


{% include question.html in_text=true
  text="How expensive are rents in Lausanne?"
  image_url="assets/img/Lausanne_by_Night.jpg"
%}


If you visit a real estate portal you see something like
[this][homegate_example]. You don't get a global view of the area and its
prices. To overcome this, we collected the listings from the three most
important swiss platforms ([Anibis](https://www.anibis.ch/),
[Homegate](https://www.homegate.ch/) and [Tutti](https://www.tutti.ch/)). After
removing duplicates and fake offers this gave us 496 offers with prices in
CHF/m<sup>2</sup>. By combining them with our geographical data from before, we
can present them in the map below.

#### Extrapolation

However, these points don't really help if one needs information for a property
between two points. Therefore, you find the second map that features the mean
rent price for each _quartier_.

We were still not satisfied by this second map, because it averages out all
fine-grained information. The  [k-nearest-neighbours] algorithm seemed like the
perfect match for the problem. (And not _only_ because of its name.) By looking
at the (in our case 13) nearest neighbours of a parcel it predicts the rent
price. This allowed us to get a smooth heat-map of rents in Lausanne.

##### => 3-layer heatmap (points, per quartier, continuous)

##### => interpret the pictures?

{% include question.html in_text=true
 text="What makes rents in Lausanne expensive?"
 image_url="assets/img/belair.jpg"
%}

#### Ownership influence

Having seen the differences in ownership across the city we ask ourselves
whether the ownership type also influences the price of accommodation. To give a
statistically correct answer, we evaluated a simple linear model with
[linear regression]. The model tries to find significantly different mean rent
prices depending on the ownership type of a parcel.

However, this model did not give a meaningful result. It seems like our
hypothesis that rents are different if the property is for example owned by a
corporation has no factual basis. Even if there are differences in the mean
rents of each ownership type they might just arise from random noise. After all,
we only have a small number of offers compared to the number of parcels.

#### Geographical factors

But if the owner doesn't influence the price what does? Why are prices
different. You can get an intuition for this by looking at the smoothed rent
map. Clearly, the parts near the lake are more red. Our next linear regression
therefore analyses the dependence of the price on the distance to the port of
Lausanne, [_Ouchy_]. As you can observe in the plot to the left, there is a
visible correlation. Our model can confirm with a high significance that the
more you go up hill the cheaper flats get.

There is also a second factor that influences rent prices per square meter. This
factor is less obvious: the surface of the flat inversely correlates with the
price per square meter. From the plot one can see that especially small flats
have a very high price per square meter.


##### => linear regression 2 plots

{% include question.html in_text=true
 text="What have we learned from it?"
 image_url="assets/img/Lausanne_img_0585.jpg"
%}

Even if we did not exactly find what we set out to find, we learned quite a bit
about rent prices and _quartiers_. Our first hypothesis that rent prices are
influenced by the owner was rejected. We see two reasons for this: First, we
only had sparse data about rents. The circa 500 offers we collected only cover a
small percentage of rental units in Lausanne.

The second and more important reason is the market. By the law of supply and
demand prices will always balance one another. Put in other terms, no owner will
offer their property at a higher price than the neighbours because this would be
an economical disadvantage. Similarly, if all neighbours offer their real estate
at a high price the owner will do the same. This demonstrates the importance of
the _quartiers_ or in general the geographical situation that we showed was a
significant factor for the price.

As students at [EPFL](https://www.epfl.ch/) we know how hard it is to find
accommodation in Lausanne. We hope that this analysis helped you understand
where to look for a flat and what parameters determine the prices across the
city.


#### Open data

Let us finish with a thought on open data. All underlying data of this project
is publicly available. The cadastral data represents the more common case where
statistical offices of a governmental body make datasets available. But also the
rent price data is public since you clicked on the the links of the real estate
portals and saw all their listings and prices.

This projects shows the potential of open data for providing transparency and
insight into otherwise opaque systems. Websites like
[opendata.swiss](https://opendata.swiss) offer  a wide range of datasets and we
can only encourage you to visit them and get insights on other things that
interest you!


_Thanks for reading._ [^2]


[^2]: All images are from [wikimedia commons](https://commons.wikimedia.org/wiki/Category:Lausanne).

[_Ouchy_]: https://map.geo.admin.ch/?lang=en&topic=ech&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege&layers_visibility=false,false,false,false&layers_timestamp=18641231,,,&E=2537733&N=1150883&zoom=7.498594761554026&crosshair=marker

[linear regression]: https://en.wikipedia.org/wiki/Linear_regression
[k-nearest-neighbours]: https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm
[asit]: https://www.asitvd.ch/chercher/catalogue.html?view=sheet&guid=486&catalog=main&type=complete&preview=search_list
[cadastral]: https://en.wikipedia.org/wiki/Cadastre
[homegate_example]: https://www.homegate.ch/rent/real-estate/city-lausanne/matching-list?tab=list&o=sortToplisting-desc
[quartiers_lausanne]: https://www.lausanne.ch/en/officiel/statistique/quartiers/presentation-des-quartiers.html
[_zones foraines_]: https://www.lausanne.ch/en/officiel/statistique/quartiers/presentation-des-quartiers/90-zones-foraines.html
