import React from 'react'

import user1 from '../../assets/images/reviewer1.jpg'
import user2 from '../../assets/images/reviewer2.jpg'
import user3 from '../../assets/images/reviewer3.jpg'
import user4 from '../../assets/images/reviewer4.jpg'

import './homecomponentsstyles/review.css'

function Reviews() {
  return (
    <div id='reviews_cont'>
        <section>
            <figure>
                <img className='reviewerpic' src={user1} alt="user1" />
            </figure>

            <article>
                <aside className='reviews'>
                    <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span> TechSpherica is an outstanding tech blogging platform. It consistently delivers high-quality, informative articles. The user-friendly interface makes navigating topics a breeze. A must-visit for tech enthusiasts and anyone seeking tech insights! <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span>
                </aside>
                <label className='reviewername'>Ethan Rodriguez</label>
            </article>
        </section>

        <section>
            <figure>
                <img className='reviewerpic' src={user2} alt="user2" />
            </figure>

            <article>
                <aside className='reviews'>
                    <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span> TechSpherica offers a treasure trove of tech knowledge. It&apos;s my go-to for the latest trends and insights. The diverse range of topics keeps me engaged, and the articles are well-researched and informative. <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span>
                </aside>
                <label className='reviewername'>Mia Johnson</label>
            </article>
        </section>

        <section>
            <figure>
                <img className='reviewerpic' src={user3} alt="user3" />
            </figure>

            <article>
                <aside className='reviews'>
                    <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span> TechSpherica is a tech lover&apos;s paradise. The content is consistently top-notch, and the site&apos;s layout is clean and easy to navigate. It&apos;s my one-stop shop for staying updated in the tech world. <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span>
                </aside>
                <label className='reviewername'>Liam Brown</label>
            </article>
        </section>

        <section>
            <figure>
                <img className='reviewerpic' src={user4} alt="user4" />
            </figure>

            <article>
                <aside className='reviews'>
                    <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span> As a tech enthusiast, I rely on TechSpherica for its comprehensive tech coverage. The writers here truly know their stuff, and the content is always fresh and engaging. Highly recommended for tech aficionados! <span style={{color:'#B5DF53',fontSize:'20px',fontWeight:'500'}}>&quot;</span>
                </aside>
                <label className='reviewername'>Olivia Smith</label>
            </article>
        </section>
    </div>
  )

  }
export default Reviews;