<template>
  <div class="br-header">
    <div class="br-header-left">
      <div class="navicon-left hidden-md-down">
        <a id="btnLeftMenu"><i class="icon ion-navicon-round"></i></a>
      </div>
      <div class="navicon-left hidden-lg-up">
        <a id="btnLeftMenuMobile">
          <i class="icon ion-navicon-round"></i>
        </a>
      </div>
    </div>
    <!-- br-header-left -->
    <div class="br-header-right">
      <nav class="nav">
        <div class="dropdown">
          <a class="nav-link pd-x-10 r-5 pos-relative" data-toggle="dropdown">
            <i class="icon ion-ios-email-outline tx-24"></i>
            <!-- start: if statement -->
            <span
              class="square-8 bg-danger pos-absolute t-5 r-0 rounded-circle message-badge"
            >
              4
            </span>
            <!-- end: if statement -->
          </a>
          <div class="dropdown-menu dropdown-menu-header wd-300 pd-0-force">
            <div
              class="d-flex align-items-center justify-content-between pd-y-10 pd-x-20 bd-b bd-gray-200"
            >
              <label
                class="tx-12 tx-info tx-uppercase tx-semibold tx-spacing-2 mg-b-0"
              >
                Messages
              </label>
              <a href="#" class="tx-11">+ Add New Message</a>
            </div>
            <!-- d-flex -->
            <div class="media-list">
              <!-- loop starts here -->
              <a href="#" class="media-list-link">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img3.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <div
                      class="d-flex align-items-center justify-content-between mg-b-5"
                    >
                      <p class="mg-b-0 tx-medium tx-gray-800 tx-14">
                        Donna Seay
                      </p>
                      <span class="tx-11 tx-gray-500">2 minutes ago</span>
                    </div>
                    <!-- d-flex -->
                    <p class="tx-12 mg-b-0">
                      A wonderful serenity has taken possession of my entire
                      soul, like these sweet mornings of spring.
                    </p>
                  </div>
                </div>
                <!-- media -->
              </a>
              <!-- loop ends here -->
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img4.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <div
                      class="d-flex align-items-center justify-content-between mg-b-5"
                    >
                      <p class="mg-b-0 tx-medium tx-gray-800 tx-14">
                        Samantha Francis
                      </p>
                      <span class="tx-11 tx-gray-500">3 hours ago</span>
                    </div>
                    <!-- d-flex -->
                    <p class="tx-12 mg-b-0">
                      My entire soul, like these sweet mornings of spring.
                    </p>
                  </div>
                </div>
                <!-- media -->
              </a>
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img7.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <div
                      class="d-flex align-items-center justify-content-between mg-b-5"
                    >
                      <p class="mg-b-0 tx-medium tx-gray-800 tx-14">
                        Robert Walker
                      </p>
                      <span class="tx-11 tx-gray-500">5 hours ago</span>
                    </div>
                    <!-- d-flex -->
                    <p class="tx-12 mg-b-0">
                      I should be incapable of drawing a single stroke at the
                      present moment...
                    </p>
                  </div>
                </div>
                <!-- media -->
              </a>
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img5.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <div
                      class="d-flex align-items-center justify-content-between mg-b-5"
                    >
                      <p class="mg-b-0 tx-medium tx-gray-800 tx-14">
                        Larry Smith
                      </p>
                      <span class="tx-11 tx-gray-500">Yesterday</span>
                    </div>
                    <!-- d-flex -->
                    <p class="tx-12 mg-b-0">
                      When, while the lovely valley teems with vapour around me,
                      and the meridian sun strikes...
                    </p>
                  </div>
                </div>
                <!-- media -->
              </a>
              <div class="pd-y-10 tx-center bd-t">
                <a href="#" class="tx-12">
                  <i class="fa fa-angle-down mg-r-5"></i>
                  Show All Messages
                </a>
              </div>
            </div>
            <!-- media-list -->
          </div>
          <!-- dropdown-menu -->
        </div>
        <!-- dropdown -->
        <div class="dropdown">
          <a
            href="#"
            class="nav-link pd-x-10 pos-relative"
            data-toggle="dropdown"
          >
            <i class="icon ion-ios-bell-outline tx-24"></i>
            <!-- start: if statement -->
            <span
              class="square-8 bg-danger pos-absolute t-5 r-5 rounded-circle notification-badge"
            >
              4
            </span>
            <!-- end: if statement -->
          </a>
          <div class="dropdown-menu dropdown-menu-header wd-300 pd-0-force">
            <div
              class="d-flex align-items-center justify-content-between pd-y-10 pd-x-20 bd-b bd-gray-200"
            >
              <label
                class="tx-12 tx-info tx-uppercase tx-semibold tx-spacing-2 mg-b-0"
              >
                Notifications
              </label>
              <a href="#" class="tx-11">Mark All as Read</a>
            </div>
            <!-- d-flex -->
            <div class="media-list">
              <!-- loop starts here -->
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img8.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <p class="tx-13 mg-b-0 tx-gray-700">
                      <strong class="tx-medium tx-gray-800">
                        Suzzeth Bungaos
                      </strong>
                      tagged you and 18 others in a post.
                    </p>
                    <span class="tx-12">October 03, 2017 8:45am</span>
                  </div>
                </div>
                <!-- media -->
              </a>
              <!-- loop ends here -->
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img9.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <p class="tx-13 mg-b-0 tx-gray-700">
                      <strong class="tx-medium tx-gray-800">
                        Mellisa Brown
                      </strong>
                      appreciated your work
                      <strong class="tx-medium tx-gray-800">
                        The Social Network
                      </strong>
                    </p>
                    <span class="tx-12">October 02, 2017 12:44am</span>
                  </div>
                </div>
                <!-- media -->
              </a>
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img
                    src="img/img10.jpg"
                    class="wd-40 rounded-circle"
                    alt=""
                  />
                  <div class="media-body">
                    <p class="tx-13 mg-b-0 tx-gray-700">
                      20+ new items added are for sale in your
                      <strong class="tx-medium tx-gray-800">Sale Group</strong>
                    </p>
                    <span class="tx-12">October 01, 2017 10:20pm</span>
                  </div>
                </div>
                <!-- media -->
              </a>
              <a href="#" class="media-list-link read">
                <div class="media pd-x-20 pd-y-15">
                  <img src="img/img5.jpg" class="wd-40 rounded-circle" alt="" />
                  <div class="media-body">
                    <p class="tx-13 mg-b-0 tx-gray-700">
                      <strong class="tx-medium tx-gray-800">
                        Julius Erving
                      </strong>
                      wants to connect with you on your conversation with
                      <strong class="tx-medium tx-gray-800">Ronnie Mara</strong>
                    </p>
                    <span class="tx-12">October 01, 2017 6:08pm</span>
                  </div>
                </div>
                <!-- media -->
              </a>
              <div class="pd-y-10 tx-center bd-t">
                <a href="#" class="tx-12">
                  <i class="fa fa-angle-down mg-r-5"></i>
                  Show All Notifications
                </a>
              </div>
            </div>
            <!-- media-list -->
          </div>
          <!-- dropdown-menu -->
        </div>
        <!-- dropdown -->
        <div class="dropdown">
          <a href="#" class="nav-link nav-link-profile" data-toggle="dropdown">
            <span class="logged-name hidden-md-down"></span>
            <img src="img/img1.jpg" class="wd-32 rounded-circle" alt="" />
            <span class="square-10 bg-success"></span>
          </a>
          <div class="dropdown-menu dropdown-menu-header wd-200">
            <ul class="list-unstyled user-profile-nav">
              <li>
                <a href="#">
                  <i class="icon ion-ios-person-outline"></i>
                  Edit Profile
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon ion-ios-gear-outline"></i>
                  Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon ion-ios-download-outline"></i>
                  Downloads
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon ion-ios-star-outline"></i>
                  Favorites
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon ion-ios-folder-outline"></i>
                  Collections
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon ion-power"></i>
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
          <!-- dropdown-menu -->
        </div>
        <!-- dropdown -->
      </nav>
      <!-- navicon-right -->
    </div>
    <!-- br-header-right -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {};
  },
  data: () => ({}),
  computed: {},
  methods: {},
});
</script>
<style lang="scss" scoped>
.br-header,
.br-logo {
  z-index: 999;
}
</style>
