import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

// Import what you need. RECOMMENDED. ✔️
import { AccountBookFill, AlertFill, AlertOutline,
  MenuFoldOutline, UserOutline,TeamOutline, SearchOutline, PlusOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ 
  AccountBookFill, AlertOutline, AlertFill, 
  MenuFoldOutline, UserOutline, TeamOutline, SearchOutline, PlusOutline ];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzCardModule,
    NzDropDownModule,
    NzBadgeModule,
    NzAlertModule,
    NzTableModule,
    NzPopconfirmModule,
    NzNotificationModule,
    NzSpaceModule,
    NzTabsModule,
    NzSelectModule, 
    NzSkeletonModule,
    NzResultModule,
    NzSpinModule,
    NzModalModule,
    NzDividerModule,
    NzDatePickerModule,
    NzMessageModule,
    NzInputNumberModule,
    NzIconModule.forRoot(icons),
    
    
    
  ],
  exports: [
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzCardModule,
    NzDropDownModule,
    NzBadgeModule,
    NzAlertModule,
    NzTableModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTabsModule,
    NzNotificationModule,
    NzSelectModule,
    NzResultModule,
    NzSpinModule, 
    NzModalModule,
    NzDividerModule,
    NzDatePickerModule,
    NzMessageModule,
    NzInputNumberModule,
    NzSkeletonModule 
  ]
})
export class NgzorroModule { }
