using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)  
        {
            // users 

            if (!userManager.Users.Any())
            {
                var user = new User 
                {
                    UserName = "bob",
                    Email = "bob@test.com",
                    Role = "member"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "member");

                var doctor = new User 
                {
                    UserName = "ben",
                    Email = "ben@test.com",
                    Role = "doctor"
                };

                await userManager.CreateAsync(doctor, "Pa$$w0rd");
                await userManager.AddToRoleAsync(doctor, "doctor");
            
                var admin = new User 
                {
                    UserName = "admin",
                    Email = "admin@test.com",
                    Role="admin"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[]  {"Member", "Admin", "Doctor"});
            }
               


            // link contacts

            if (context.LinkContacts.Any()) return;
            
            var linkContacts = new List<LinkContact>
            {
                new LinkContact
                {
                    Title = "Asociația Română de Prevenție a Suicidului",
                    Description = "Acest site oferă informații și resurse despre prevenirea suicidului, inclusiv o listă cu centre de asistență și consiliere din România.",
                    Link = "www.antisuicid.com"
                },
                new LinkContact
                {
                    Title = "Depresionline",
                    Description = "Acest site oferă informații despre depresie, tulburări de anxietate și alte probleme de sănătate mentală, precum și o comunitate online unde persoanele pot să împărtășească experiențele lor și să primească sprijin de la alți membri.",
                    Link = "www.depresionline.ro"
                },
                new LinkContact
                {
                    Title = "Psihoterapie.ro",
                    Description = "Acest site oferă informații despre terapie și psihoterapie, inclusiv o listă cu terapeuți și psihoterapeuți din România, precum și articole și resurse despre sănătatea mentală.",
                    Link = "www.psihoterapie.ro"
                },
                new LinkContact
                {
                    Title = "Sprijin pentru Depresie",
                    Description = "Acest site oferă informații și resurse despre depresie, precum și o comunitate online unde persoanele pot să împărtășească experiențele lor și să primească sprijin de la alți membri.",
                    Link = "www.sprijinpentrudepresie.ro"
                },
                new LinkContact
                {
                    Title = "Asociația SuperErou",
                    Description = "Această asociație se concentrează pe promovarea sănătății mintale în rândul copiilor și tinerilor și oferă programe și servicii de consiliere și terapie pentru aceste grupuri de vârstă.",
                    Link = "www.supereou.ro"
                },
            };

            foreach (var linkContact in linkContacts)
            {
                context.LinkContacts.Add(linkContact);
            }


            // phone contacts

            if (context.PhoneContacts.Any()) return;
            
            var phoneContacts = new List<PhoneContact>
            {
                new PhoneContact
                {
                    Title = "Asociația Română de Prevenție a Suicidului",
                    Description = "Acest număr este gratuit și disponibil 24/7 pentru oricine are nevoie de ajutor în situații de suicid sau depresie.",
                    Phone = "0800 801 200"
                },
                new PhoneContact
                {
                    Title = "Linia de sprijin pentru depresie și tulburări emoționale",
                    Description = "Acest număr este gratuit și disponibil 24/7 pentru oricine are nevoie de sprijin și consiliere în situații de depresie sau tulburări emoționale.",
                    Phone = "116 123"
                },
                new PhoneContact
                {
                    Title = "Serviciul Român de Asistență în Situații de Urgență",
                    Description = "În cazul în care sunteți într-o situație de urgență și aveți gânduri suicidale imediate, puteți suna la acest număr pentru a primi asistență medicală de urgență.",
                    Phone = "112"
                },
                new PhoneContact
                {
                    Title = "Centrul de Prevenire, Evaluare și Consiliere Antisuicid",
                    Description = "Acest centru oferă servicii de consiliere și terapie pentru persoanele cu gânduri suicidale sau cu probleme emoționale severe.",
                    Phone = "021 323 46 73"
                },
                new PhoneContact
                {
                    Title = "Centrul de Asistență pentru Depresie și Anxietate",
                    Description = "Acest centru oferă servicii de terapie și consiliere pentru persoanele cu probleme de depresie și anxietate.",
                    Phone = "0746 175 266"
                },
                new PhoneContact
                {
                    Title = "Asociația de Psihiatrie și Psihoterapie Tânără",
                    Description = "Această asociație oferă servicii de consiliere și terapie pentru tineri cu probleme de sănătate mintală, inclusiv depresie, anxietate și probleme de comportament.",
                    Phone = " 0769 428 990"
                },
            };

             foreach (var phoneContact in phoneContacts)
            {
                context.PhoneContacts.Add(phoneContact);
            }


            // testimonials

            if (context.Testimonials.Any()) return;

            var testimonials = new List<Testimonial> 
            {
                new Testimonial
                {
                    text = "Am încercat terapia înainte, dar nu a funcționat niciodată pentru mine. Dar cu Therapy Hub a fost diferit. Simt că am găsit un terapeut care mă înțelege cu adevărat și care poate să mă ajute să fac progrese reale în sănătatea mea mentală. Nu pot recomanda suficient această aplicație."
                },
                new Testimonial
                {
                    text = "Nu m-am gândit niciodată că aș fi confortabil cu terapia, dar Therapy Hub a schimbat asta. Terapeuții sunt atât de compasiuneți și înțelegători, și simt că pot fi eu însumi cu ei. Am învățat atât de multe despre mine și emoțiile mele, și sunt mult mai fericit acum. Mulțumesc, Therapy Hub!"
                },
                new Testimonial
                {
                    text = "Trecusem printr-un moment foarte dificil și nu știam încotro să mă îndrept. Dar apoi am găsit Therapy Hub și totul s-a schimbat. Terapeutul meu este uimitor, și m-a ajutat să lucrez prin problemele mele într-un mod în care nu credeam că este posibil. Sunt atât de recunoscător pentru această aplicație."
                }
            };

            foreach (var testimonial in testimonials)
            {
                context.Testimonials.Add(testimonial);
            }


            // products (books)
            
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Arta de a asculta",
                    Description = "Cum era Erich Fromm ca terapeut? Ce principii îl ghidau în înțelegerea suferințelor psihice ale pacienților săi? Volumul de față ne permite să îl însoțim în cabinet și să descoperim elementele esențiale ale artei sale de a-și asculta pacienții, modul în care reușește să îi înțeleagă, păstrându-și vie dorința de a învăța despre oameni, fără să se ascundă în spatele tehnicii.",
                    Price = 3500,
                    PictureUrl = "/images/products/pt-book1.png",
                    Brand = "Erich Fromm",
                    Type = "Psihoterapie",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cum se schimbă oamenii",
                    Description = "Indiferent de orientarea clinica si de stil, psihoterapia reprezinta un proces ce se creeaza in fiecare moment intre client si terapeut. Editata de doi psihoterapeuti, autori si editori de renume, Daniel J. Siegel si Marion Solomon, Cum se schimba oamenii exploreaza in profunzime complexele resorturi ale atasamentului, creierului, mintii si corpului pentru a ne oferi o imagine cat mai completa a schimbarii care apare in psihoterapie.",    
                    Price = 5500,
                    PictureUrl = "/images/products/pt-book2.jpeg",
                    Brand = "Daniel J.Siegel",
                    Type = "Psihoterapie",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Corpul își amintește",
                    Description = "Corpul isi aminteste, vol. 2, Revolutionarea tratamentului traumei vine in completarea primului volum al autoarei, publicat si el la editura Herald, Psihofiziologia si tratamentul traumei, fara a fi insa necesar sa fie citite impreuna sau intr-o anumita ordine. Cu toate acestea, cele doua volume ale autoarei reprezinta un adevarat ABC al terapeutului, indiferent de metodele de tratament in care este specializat: EMDR, experimentare somatica, TCC centrat pe trauma etc. Aceasta pentru ca autoarea, Babette Rothschild, s-a straduit sa construiasca intai o fundatie stabila pe care orice terapeut sa isi poata sustine practica in siguranta, eficient si cu onestitate.",    
                    Price = 5000,
                    PictureUrl = "/images/products/pt-book3.jpeg",
                    Brand = "Babette Rothschild",
                    Type = "Psihoterapie",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cu mintea limpede",
                    Description = "Milioane de oameni își fac griji că abuzul de alcool le afectează sănătatea, dar se tem că renunțarea la acesta va însemna plictiseală, dificultăți de socializare și schimbări majore ale stilului de viață. Annie Grace împletește în mod strălucit cele mai recente descoperiri științifice din domeniile psihologiei și neurologiei privitoare la această dependență, analizând mai degrabă cauzele decât simptomele. Autoarea contrazice mitul cultural conform căruia alcoolul este o parte vitală a vieții și demonstrează că recuperarea controlului nu este esențială doar pentru fericirea și împlinirea personală, ci și pentru a pune capăt suferinței celor apropiați persoanei dependente.",
                    Price = 5000,
                    PictureUrl = "/images/products/pt-book4.jpeg",
                    Brand = "Annie Grace",
                    Type = "Psihoterapie",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Copilul interior",
                    Description = "Fiecare purtăm în noi, asemenea unei păpuşi ruseşti, un eu infantil: copilul care ne ghidează paşii la maturitate. Poate fi un adevărat înger păzitor, dacă ai avut o copilărie fericită şi te‑ai simţit în siguranţă. În schimb, dacă ai avut o copilărie dificilă, dacă ai fost maltratat sau ai asistat la suferinţa părinţilor, copilul din tine se dovedeşte a fi de‑a dreptul călău, un obstacol către fericirea pe care o cauţi de atâta vreme.",
                    Price = 6000,
                    PictureUrl = "/images/products/pt-book5.jpeg",
                    Brand = "Moussa Nabati",
                    Type = "Psihoterapie",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sufletul ascuns al casei",
                    Description = "Ce se întâmplă când o familie se mută într-o casă nouă? Dar atunci când își pierde locuința? Ce semnificație au casele moștenite? Dar diferitele obiecte de decor? Atașand casa familiei care o locuiește, autorul obține o perspectivă psihologică mult mai bogată, în care teritoriul intimității familiale este modelat de forțele inconștiente care se acumulează în locul în care trăim, oglindind legăturile dintre membrii familiei.",
                    Price = 5500,
                    PictureUrl = "/images/products/fam-book1.png",
                    Brand = "Alberto Eiguer",
                    Type = "Psihologia familiei",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Ce știm depsre părinții noștri",
                    Description = "„Ce știm despre părinții noștri“ este una dintre cele mai sincere și mai autointerogative cărți. O carte care analizează relația dintre părinți și copii, cei nouă coautori ai cărții răspunzând sincer la un set de întrebări despre părinți, ca într-un joc. ",
                    Price = 4000,
                    PictureUrl = "/images/products/fam-book2.jpeg",
                    Brand = "Alex Calin",
                    Type = "Psihologia familiei",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fiecare familie are o poveste",
                    Description = "Ce anume face ca unele familii să prospere în ciuda obstacolelor uriașe, iar altele să se destrame? Ce indicii anunță dizolvarea unei familii? De ce ne exasperează familiile noastre? Julia Samuel își propune să exploreze aceste întrebări și să ajute la înțelegerea profundă a familiilor reale, care prezintă un întreg spectru de disfuncționalități și sunt influențate de factori de stres interni și externi. ",
                    Price = 6500,
                    PictureUrl = "/images/products/fam-book3.jpeg",
                    Brand = "Julia Samuel",
                    Type = "Psihologia familiei",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Tata și copilul",
                    Description = "În continuare definit de mamă (şi din păcate într-o măsură mult prea mare), rolul tatălui nu este simplu de asumat. De unde şi ideea pe care, după ce a constatat confuzia care domneşte vizavi de maternitate şi de misterele sale, a avut-o pediatrul Jacky Israel: aceea ce a reacorda taţilor rolul care li se cuvinte – unul de pe urma căruia copilul nu are decât de câştigat.",
                    Price = 3500,
                    PictureUrl = "/images/products/fam-book4.jpeg",
                    Brand = "Jacky Israel",
                    Type = "Psihologia familiei",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Arta de a iubi",
                    Description = "Într-o cultură mercantilă și narcisică, puțini mai reușesc să trăiască o iubire împlinită și autentică, stabilă și satisfăcătoare. Și aceasta, pentru că uităm adeasea că iubirea, ca orice fel de „artă”, are nevoie de exercițiu și răbdare, de concentrare și determinare. ",
                    Price = 5500,
                    PictureUrl = "/images/products/dp-book1.jpeg",
                    Brand = "Erich Fromm",
                    Type = "Dezvoltare personală",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sufletul omului",
                    Description = "In volumul de fata Fromm dezvolta ideile sale despre iubirea de viata si iubirea de moarte, face diferenta intre diferite feluri de agresivitate aflate direct sau indirect in serviciul vietii si formele maligne ale distructivitatii, descriind doua tipuri de personalitate: biofilul si necrofilul. Pe baza experientei sale clinice si a cercetarii proceselor sociale, el arata ca iubirea de viata, independenta si depasirea narcisismului formeaza un „sindrom de crestere”, opus „sindromului de descompunere”, format de iubirea de moarte, simbioza incestuoasa si narcisismul malign.",
                    Price = 6000,
                    PictureUrl = "/images/products/dp-book2.png",
                    Brand = "Erich Fromm",
                    Type = "Dezvoltare personală",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "O sa treacă și asta",
                    Description = "Când totul merge ca pe roate, ideea că lucrurile sunt efemere ne sperie. Dar dacă viața ne pune la încercare, ne simțim alinați de imaginea ei ca o apă curgătoare, într-un flux perpetuu, ce ne ajută să privim cu încredere în viitor.",
                    Price = 5500,
                    PictureUrl = "/images/products/dp-book3.png",
                    Brand = "Julia Samuel",
                    Type = "Dezvoltare personală",
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}