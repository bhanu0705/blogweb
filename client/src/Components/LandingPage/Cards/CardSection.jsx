import React, { useEffect, useState } from 'react';
import './CardSection.css';
import { Form, useNavigate } from 'react-router-dom';

import cover1 from '../../../assets/Cards/cover1.jpg';
import cover2 from '../../../assets/Cards/cover2.jpg';
import cover3 from '../../../assets/Cards/cover3.jpg';
import cover4 from '../../../assets/Cards/cover4.png';
import cover5 from '../../../assets/Cards/cover5.jpg';
import cover6 from '../../../assets/Cards/cover6.jpg';
import cover7 from '../../../assets/Cards/cover7.jpg';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

export const cards = [
  {
    id: 1,
    title: '7 CSS tools you should be using ',
    category: 'development',
    subCategory: ['frontend', 'ui/ux', 'design'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover1,
  },
  {
    id: 2,
    title: 'Milan Places That Highlight The City',
    category: 'travel',
    subCategory: ['vacation', 'holidays', 'sight seeing'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover2,
  },
  {
    id: 3,
    title: 'Online Shopping – An Alternative to Shopping in the Mall',
    category: 'shopping',
    subCategory: ['e-commerce store', 'clothing', 'shopping store'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover3,
  },
  {
    id: 4,
    title: 'ADVENTURE IN YOU',
    category: 'adventure',
    subCategory: ['adrenaline', 'stay-fit', 'lifestyle'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover4,
  },
  {
    id: 5,
    title: 'Loaded BBQ Baked Potatoes',
    category: 'cooking',
    subCategory: ['bbq', 'food', 'lifestyle'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover5,
  },
  {
    id: 6,
    title: 'Beyond the Beach',
    category: 'travel',
    subCategory: ['beaches', 'sea', 'holidays'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover6,
  },
  {
    id: 7,
    title: 'Art & Perception',
    category: 'art',
    subCategory: ['skill', 'design', 'passion'],
    description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut quo inventore error, eaque incidunt, explicabo quia quas doloremque voluptatem, adipisci debitis ratione cum minima commodi facilis porro numquam perspiciatis quam voluptate placeat beatae provident asperiores a. Id facere voluptate maiores hic consequatur temporibus odio aperiam mollitia inventore tempora deserunt eius at aspernatur, iure, deleniti quisquam possimus numquam error animi alias, laudantium praesentium ipsa. Fugiat molestias corrupti minima illum excepturi, architecto earum hic sint dicta repudiandae nobis eius commodi. Veniam, quisquam? Corporis cupiditate minima accusantium voluptatum, et obcaecati fugiat iste quibusdam sunt odit perspiciatis incidunt rerum illum consectetur nam voluptates. Ducimus amet et veniam qui assumenda id consequuntur, mollitia itaque soluta sunt, doloremque magni obcaecati voluptatem ipsa facere molestias incidunt hic vitae ipsum. Doloremque rerum sit animi explicabo? Reiciendis perspiciatis quidem vitae cupiditate eius corporis quam dolorum non repudiandae animi! Alias provident dignissimos veniam! Itaque ducimus, temporibus corrupti ipsa doloremque voluptatibus culpa maiores, cum obcaecati modi rerum quod perferendis explicabo natus expedita quo laudantium ratione et mollitia, hic dolore. Consequuntur possimus cumque fugit rerum, dicta voluptas et nam reiciendis rem hic quibusdam atque iure. Labore nesciunt iste illum sapiente excepturi incidunt mollitia voluptate fugiat praesentium? Aperiam in tempore quisquam sunt!",
    authorName: 'John Doe',
    authorAvatar: '/assets/images/author.jpg',
    createdAt: 'June 03, 2021',
    cover: cover7,
  },
];

function CardSection({blogs}) {
  const navigate= useNavigate();
  return (
    <section className="card-section">
      <h2 className="section-title">Latest Reads</h2>
      <div className="cards-container">
        {blogs && blogs.map((card,index) => (
          <div className="card" key={card._id}>
            <img src={cards[index%7].cover} alt="cover image" className="card-image" />
            <h3 className='card-title'>{card.title}</h3>
            <button className="read-more-button" onClick={()=>navigate(`/BlogPage/${card._id}`)}>Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardSection;