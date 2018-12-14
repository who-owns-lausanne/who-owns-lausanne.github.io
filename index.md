---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

---

Finding an apartment in Lausanne with a rent that fits a student budget is a
time-consuming and tedious task. If you have just arrived in Lausanne, you don't
know where to look. Is it cheaper on the hill or near the university? The
problem seems overwhelming because one does not know all the parameters that
come into play. And while running from one flat viewing to another you start to
wonder who owns all this real estate you would like to live in? Do real estate
agencies you mostly deal with own the houses they rent or do they simply manage
them?

As students at [EPFL](https://www.epfl.ch/) we know how hard it can be to find
accommodation in Lausanne. Therefore we wanted to bring some light into the
opaque world of real estate. This analysis tries to get insights into the market
situation that causes these difficulties. We hope that this will help you
understand where to look for a flat and what parameters determine the different
prices across the city.

## Analysing a city's map

One inspiration of this project was the term _swiss open data_. In fact, there
are a multitude of datasets that are publicly available on websites like
[opendata.swiss](https://opendata.swiss). This brought us to the idea of
analysing something about the city we live in and maybe help others with it.

All the data that is the basis of this project is swiss and open. The
geographical, [cadastral] and address data of the city (available as
[dataset][asit] and as a [map](https://map.lausanne.ch)) represent the common
case where statistical offices of a governmental body make datasets public for
research purposes on their website. The rent price data is swiss because it
comes from the three most important swiss rent announcement platforms
([Anibis](https://www.anibis.ch/), [Homegate](https://www.homegate.ch/) and
[Tutti](https://www.tutti.ch/)) and it is public; you just clicked on the three
links in parentheses and saw all the listings and prices.

[asit]: https://www.asitvd.ch/chercher/catalogue.html?view=sheet&guid=486&catalog=main&type=complete&preview=search_list
[cadastral]: https://en.wikipedia.org/wiki/Cadastre

A city is something large. Even if Lausanne is not New York we need to think of
it in smaller units. The most natural partition of a city is its neighbourhoods
or – in french – _quartiers_. There are 18 [_quartiers_][quartiers_lausanne] in
Lausanne. But we won't consider the [_zones foraines_] (the forest areas) for
our analysis. They are not so interesting in terms of real estate. On an even
smaller scale, we will take the cadastral parcels as our atomic unit of space.

[quartiers_lausanne]: https://www.lausanne.ch/en/officiel/statistique/quartiers/presentation-des-quartiers.html
[_zones foraines_]: https://www.lausanne.ch/en/officiel/statistique/quartiers/presentation-des-quartiers/90-zones-foraines.html

With these datasets and our digital data analysis toolkit we will try to achieve
our goal of **understanding how rent prices are influenced by the type of
the owner, the geographical situation or other factors**. So that at the end
this article could serve as a head start for people searching affordable rents in
Lausanne.

{% include question.html in_text=true
  text="Who owns your quartier?"
  image_url="assets/img/3245402894_9a4e7ef640_o.jpg"
%}

Let us look at real estate owners. Our dataset tells us the owner of each of the
almost 8000 parcels of the city (unless the parcel represents a road or a
bridge). There are about 4000 entities possessing real estate and they as
diverse as you would imagine them ranging from the city council, to private
people and even multinational companies like Crédit Suisse, Phillip Morris
International or the pension fund of Swatch. This number does not account for
single flats owned by privates. This is something quite swiss and it is called
PPE (_prorpiété par étage_). If a house's flats are owned by individuals the
dataset does not distinguish the different owners. It just indicates PPE.

The owner with the most parcels is unsurprisingly the city of Lausanne. With
1265 parcels it owns ten times more than the next two owners which are both
pension funds of the city and of the canton Vaud. Because most owners only have
a small amount of parcles we will group them into 7 types:

 - public institutions: _the city, the swiss railways etc._
 - pension funds: _retraites populaires for example_
 - corporations: _listed public companies like Swiss Life S.A., Régie Chamot & Cie S.A. etc._
 - cooperatives: _registered cooperative companies like Migros, la Mobilière etc._
 - foundations and associations: _investment foundations or associations_
 - PPE: _as above_
 - individual privates: _just normal people like you and me_

##### => Count biggest owner types per quartier

If we look at the data as a map a very noisy mosaic is offered to our eyes.

##### => noisy ownertype by parcel map

## Denoising ownership types

If you just squinted while looking at the map you had the same intuition as we
had. The mosaic is too chaotic to say us anything. Therefore, we try to blur our
view in order to get the big picture. We did the same thing but digitally. For
each parcel we drew an imaginary circle through its neighbouring parcels and
looked at the ownership type of each of them. The cell was then reassigned to
the ownership type which covered the most of the circle's surface. This can be
seen as a weighted [k-nearest-neighbors] algorithm with variable _k_.

[k-nearest-neighbors]: https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm

##### => denoised ownertype by parcel map


##### => Count biggest owner types per quartier


The fact that the two maps are quite different shows that there is a lot of
diversity in some _quartiers_' real estate owners. In order to see which
_quartiers_ are the most diversely owned, we computed another map that measures
the diversity based on the entropy

##### => exact measure and map


{% include question.html in_text=true
  text="How expensive are rents in Lausanne?"
  image_url="assets/img/Lausanne_by_Night.jpg"
%}


When you go to one of the real estate portals mentioned above,
[this][homegate_example] is what you see. You don't get any global view of the
area and the prices. To overcome this, we collected the listings from the three
portals. First, all the data was downloaded and processed. Then we merged the
three collections, removed duplicates, removed fake offers and offers for
parking lots and finally we mapped the addresses of each listing to coordinates.
The resulting 496 real estate offers are shown here (prices are in
CHF/m<sup>2</sup>):

[homegate_example]: https://www.homegate.ch/rent/real-estate/city-lausanne/matching-list?tab=list&o=sortToplisting-desc

##### => Heatmap (points of rent offers)

By considering the average rents per _quartier_, we can already say something
about different prices accross the city. The following plot shows you the
mean prices and a confidence interval ...

##### => Heatmap per quartier


{% include question.html in_text=true
 text="What makes rents in Lausanne expensive?"
 image_url="assets/img/Lausanne_by_Night.jpg"
%}

## Combined
 - 3NN for rents on all parcels => continuous heatmap
 - Linear regression does not yield significant result for link between owner type and price
 - Linear regression distance -> price ?


## Conclusion
 -> what open (gov) data can make possible...
