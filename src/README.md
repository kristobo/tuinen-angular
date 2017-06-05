Deploy
------

ng build --bh /android_asset/www/  !!!

1) environment.prod.ts file aanpassen met juist hostname
2) genereer app: ng build --prod 
3) kopieer inhoud van de dist folder naar de www root 


Extra command's
---------------

ng build --prod --bh /android_asset/www/
ng build --bh /android_asset/www/



Opbouw
------

- stuur login gegevens en krijg een token van de server
- bij de volgende requests wordt de header mee verzonden
- alle api endpoint zijn op server niveau beveiligd
- alle page's binnen angular zijn beveiligd dmv guard
