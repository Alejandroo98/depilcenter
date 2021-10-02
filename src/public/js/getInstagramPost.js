// `<a href="https://www.instagram.com/p/${item.node.shortcode}/" class="item">
// <img src="${item.node.thumbnail_src}" class="foto"/>
// <div class="info">
//   <div class="likes">Likes: ${item.node.edge_liked_by.count}</div>
//   <div class="comments"> Comments: ${item.node.edge_media_to_comment.count}</div></div>
// </div>
// </a>`

const getInstagramPost = async () => {
  let posts = [];
  const data = await fetch('https://www.instagram.com/depilcenter.ecu/?__a=1', { mode: 'no-cors' });
  // data.graphql.user.edge_owner_to_timeline_media.edges.map((item) => {
  //   posts = [
  //     ...posts,
  //     {
  //       img: item.node.thumbnail_src,
  //       likes: item.node.edge_liked_by.count,
  //       comments: item.node.edge_media_to_comment.count,
  //     },
  //   ];
  // });

  console.log(data);
};

export { getInstagramPost };
