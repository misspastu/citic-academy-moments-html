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
                  max-width: 40vw;
                  height: 40vw;
                  img{
                    width: 100%;
                    object-fit: cover;
                    display: block;
                  }
                }
              }
            }
          }
          .link{
            display: flex;
            background: #d5d5d5;
            text-decoration: none;
            color: #000;
            font-size: 1rem;
            padding: .5rem;
            align-items: center;
            img{
              width: 2rem;
              height: 2rem;
              display: block;
            }
            >div{
              margin-left: .5rem;
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
            <div class="pic-list" v-if="item.media_type==='imageArr'">
              <vue-preview :slides="item.images" @close="handleClose"/>
            </div>
            <a class="link" :href="item.link.url" v-else-if="item.media_type==='linkObj'">
              <img :src="item.link.image.small_url"/>
              <div>{{item.link.title}}</div>
            </a>
            <div class="publish-time">
              <div class="time">{{item.deployed_at | time}}</div>
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
      url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg'
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
          content
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
            small_url
          }
          link{
            title
            url
            image{
              url
              small_url
            }
          }
        }
      }`,
    ).then(data => {
      if (data && data.posts) {
        (async ()=> {
          for (let item of data.posts) {
            if (item.media_type === 'imageArr') {
              for (let img of item.images) {
                let imgs = new Image()
                imgs.src = img.url
                imgs.onload = () => {
                  img.src = img.url // 大图
                  img.msrc = img.small_url // 缩略图
                  img.w = imgs.width
                  img.h = imgs.height
                }
              }
            }
          }
        })()
        setTimeout(() => {
          this.posts = data.posts
        }, 1000)
      }
    })
  }
}
</script>
