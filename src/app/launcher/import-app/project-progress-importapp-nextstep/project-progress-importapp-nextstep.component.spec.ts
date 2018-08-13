import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import { ProjectProgressImportappNextstepComponent } from './project-progress-importapp-nextstep.component';
import { ProjectProgressService } from '../../service/project-progress.service';
import { Progress } from '../../model/progress.model';
import { LauncherComponent } from '../../launcher.component';
import { Broadcaster } from 'ngx-base';
import { BroadcasterTestProvider } from
  '../../create-app/targetenvironment-createapp-step/target-environment-createapp-step.component.spec';

let progressSubject: Subject<Progress[]> = new Subject();
let mockProjectProgressService = {
  getProgress(): Observable<Progress[]> {
    return progressSubject.asObservable();
  }
};

export interface TypeWizardComponent {
  completed(): any;
}

let mockWizardComponent: TypeWizardComponent = {
  completed() {
    // this.onComplete.emit();
  }
};

describe('Import ProjectProgressComponent', () => {
  let component: ProjectProgressImportappNextstepComponent;
  let fixture: ComponentFixture<ProjectProgressImportappNextstepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        ProjectProgressImportappNextstepComponent
      ],
      providers: [
        { provide: Broadcaster, useValue: BroadcasterTestProvider.broadcaster },
        {
          provide: LauncherComponent, useValue: mockWizardComponent
        },
        {
          provide: ProjectProgressService, useValue: mockProjectProgressService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressImportappNextstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnChanges', () => {
    let input: any = {
      statusLink: {
        currentValue: 'currentValue'
      }
    };
    spyOn(component, 'ngOnChanges');
    component.ngOnChanges(input);
    expect(component.ngOnChanges).toHaveBeenCalledWith(input);
  });
});
