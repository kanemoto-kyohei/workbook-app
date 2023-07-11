{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Users" icon="la la-question" :link="backpack_url('user')" />
<x-backpack::menu-item title="Workbooks" icon="la la-question" :link="backpack_url('workbook')" />
<x-backpack::menu-item title="Works" icon="la la-question" :link="backpack_url('work')" />
<x-backpack::menu-item title="Results" icon="la la-question" :link="backpack_url('result')" />
<x-backpack::menu-item title="Public results" icon="la la-question" :link="backpack_url('public-result')" />
<x-backpack::menu-item title="Queries" icon="la la-question" :link="backpack_url('queries')" />