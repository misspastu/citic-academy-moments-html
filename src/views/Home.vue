<style lang="less">
.home{
  .home-header{
    width: 100%;
    height: 50vw;
    background-size: 100% 100%;
    position: relative;
    img{
      position: absolute;
      width: 6rem;
      width: 6rem;
      padding: 1px;
      background: #fff;
      right: 2rem;
      bottom: -1.5rem;
    }
    .user-name{
      position: absolute;
      color: #fff;
      right: 114px;
      font-size: 2rem;
      bottom: 1rem;
    }
  }
  .home-content{
    background: #fff;
    padding: 1.25rem;
    .list{
      display: flex;
      .list-left{
        width: 2rem;
        height: 2rem;
        margin-right: .5rem;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .list-right{
        flex: 1;
        .list-right-header{
          .title{
            color: #576b95;
            font-size: 1.2rem;
          }
          .publish{
            font-size: 1.2rem;
          }
          .pic-list{
            display: flex;
            margin-bottom: .5rem;
            >div{
              .my-gallery{
                display: flex;
                flex-wrap: wrap;
                figure{
                  margin: 0;
                  width: 33.3%;
                  img{
                    width: 100%;
                    display: block;
                  }
                }
              }
            }
          }
          .publish-time{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: .5rem 0;
            .time{
              font-size: 1rem;
              color: #b1b1b1;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="home">
    <div class="home-header" :style="{backgroundImage: 'url(' + url + ')' }">
      <img src="https://public.yunpub.cn/citic-academy-moments/848c6b6b62e8b2bd41ced3fcb3883b0c.jpg">
      <span class="user-name">sunny</span>
    </div>
    <div class="home-content">
      <div v-for="(item, index) in posts" :key="index" class="list">
        <div class="list-left">
          <img :src="item.editor.avatar.small_url">
        </div>
        <div class="list-right">
          <div class="list-right-header">
            <div class="title">{{item.editor.name}}</div>
            <div class="publish">{{item.content}}</div>
            <div class="pic-list">
              <vue-preview :slides="slide1" @close="handleClose"/>
            </div>
            <div class="publish-time">
              <div class="time">{{item.deployed_at}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      posts: [],
      url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
      pic: 'https://public.yunpub.cn/citic-academy-moments/848c6b6b62e8b2bd41ced3fcb3883b0c.jpg',
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    handleClose () {
      console.log('close event')
    }
  },
  created() {
    this.$utils.query(
      `query OnApp {
        posts{
          post_id
          status_id
          media_type
          deployed_at
          editor{
            editor_id
            name
            avatar{
              url
              wx_url
              small_url
            }
          }
          images{
            url
          }
          link{
            title
            url
            image{
              url
            }
            link_id
          }
        }
      }`,
    ).then(data => {
      if (data && data.posts) {
        this.posts = data.posts
      }
    })
  }
}
</script>
