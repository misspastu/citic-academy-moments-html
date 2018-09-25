<style lang="less">
.home{
  -webkit-overflow-scrolling: touch;
  .home-header{
    width: 100%;
    height: 61.6vw;
    background: url('../assets/images/bg.png') no-repeat;
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
      border: solid 1px #dbdbdb;
      z-index: 1;
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
    padding-top: 1.25rem;
    box-sizing: border-box;
    .list{
      display: flex;
      margin-bottom: .5rem;
      position: relative;
      padding: 0.833rem;
      .list-left{
        width: 10.6vw;
        height: 10.6vw;
        margin-right: .833rem;
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
            font-size: 1.25rem;
            margin-bottom: .5rem;
          }
          .publish{
            font-size: 1.25rem;
            line-height: 1.5;
            margin-bottom: .5rem;
          }
          figure{
            margin: 0;
          }
          .one_img_height img{
            height: 47.2vw;
          }
          .one_img_width img {
            width: 47.2vw;
          }
          .one_img img {
            width: 47.2vw;
            height: 47.2vw;
          }
          .four_img {
            .my-gallery{
              display: flex;
              flex-wrap: wrap;
            }
            figure{
              width: 22vw;
              height: 22vw;
              margin: 2.6vw 1.3vw 0 0;
              &:nth-child(2n){
                margin-right: 22vw;
              }
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              }
            }
          }
          .pic-list{
            display: flex;
            margin-bottom: .5rem;
            >div{
              .my-gallery{
                display: flex;
                flex-wrap: wrap;
                figure{
                  width: 22vw;
                  height: 22vw;
                  margin: 2.6vw 1.3vw 0 0;
                  img{
                    width: 100%;
                    height: 100%;
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
              line-height: 1.5;
            }
          }
          .publish-time{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: .883rem 0 0.5rem 0;
            .time{
              font-size: 1.08rem;
              color: #b1b1b1;
            }
          }
        }
      }
    }
    .list::after{
      content: '';
      width: 200%;
      height: 0;
      box-sizing: border-box;
      position: absolute;
      // top: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid #d5d5d5;
      border-radius: 4px;
      transform: scale(0.5, 0.5);
      transform-origin: top left;
    }
    .list:last-child::after{
      border: none;
    }
  }
}
</style>
<template>
  <div class="home">
    <div class="home-header">
      <img src="https://public.yunpub.cn/citic-academy-moments/848c6b6b62e8b2bd41ced3fcb3883b0c.jpg">
      <span class="user-name">sunny</span>
    </div>
      <mescroll-vue class="home-content" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div v-for="(item, index) in dataList" :key="index" class="list">
          <div class="list-left">
            <img :src="item.editor.avatar.small_url">
          </div>
          <div class="list-right">
            <div class="list-right-header">
              <div class="title">{{item.editor.name}}</div>
              <div class="publish">{{item.content}}</div>
              <div :class='className(item.images)' v-if="item.media_type==='imageArr' && item.images[0].msrc">
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
      </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
const query = `query OnApp ($limit: Int, $offset: Int){
        posts(limit: $limit, offset: $offset){
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
      }`
export default {
  name: 'home',
  components: {
    MescrollVue
  },
  data() {
    return {
      posts: [],
      mescroll: null, // mescroll实例对象
      mescrollDown:{
        callback: this.downCallback,
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 5,
        toTop: { // 回到顶部按钮
					src: "https://public.yunpub.cn/citic-academy-moments/569cc33b3bf43cfe5810cea2b4a27c57.jpg", //图片路径,默认null,支持网络图
          offset: 10, //列表滚动1000px才显示回到顶部按钮
          warpId: null, 
          html: null, 
          warpClass: "mescroll-totop", 
          showClass: "mescroll-fade-in", 
          hideClass: "mescroll-fade-out", 
          duration: 300, 
          supportTap: false
				},
      },
      dataList: []
    }
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback () {
      console.log('upCallback')
      this.getData()
    },
    downCallback() {
      console.log('downCallback')
    },
    handleClose () {
      console.log('close event')
    },
    getData() {
      this.$utils.query(query,
      {
        limit: 10,
        offset: this.dataList.length
      }
      ).then(data => {
        if (data && data.posts) {
          const result = []
          for (const item of data.posts) {
            if (item.media_type === 'imageArr') {
              if (item.images.length == 1) {
                let pic = new Image()
                pic.src = item.images[0].small_url
                pic.onload = () => {
                  item.images[0].percent = (pic.width / pic.height)
                }
              }
              for (let i in item.images) {
                let imgs = new Image()
                imgs.src = item.images[i].url
                imgs.onload = () => {
                  item.images[i].src = item.images[i].url // 大图
                  item.images[i].msrc = item.images[i].small_url // 缩略图
                  item.images[i].w = imgs.width
                  item.images[i].h = imgs.height
                }
              }
            }
            result.push(item)
          }
          setTimeout(() => { // 我再想想有没有别的解决方法
            // this.posts = result
            this.dataList = this.dataList.concat(result)
            this.$nextTick(() => {
              // this.mescroll.endSuccess(result.length)
              // this.mescroll.endSuccess(result.length, false)
              // this.mescroll.endBySize(result.length, 10) // 自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据
            })
          }, 1000)
        }
      })
    },
    className(imagesList) {
      const len = imagesList.length
      if (len == 1) {
        const percent = imagesList[0].percent
        if (percent > 1) {
          return 'one_img_width'
        } else if (percent < 1) {
          return 'one_img_height'
        } else {
          return 'one_img'
        }
      } else if (len == 4) {
        return 'four_img'
      } else {
        return 'pic-list'
      }
    }
  },
  created() {
  }
}
</script>
