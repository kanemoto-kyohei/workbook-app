<?php

namespace Tests\Unit\Services;

use PHPUnit\Framework\TestCase;
use App\Services\WorkService;
use Mockery;

class WorkbookServiceTest extends TestCase
{
    /**
     * A basic unit test example.
     * @runInSeparateProcess
     * @return void
     */
    public function test_check_own_work(): void
    {
        $workService = new WorkService();

        $mock = Mockery::mock('alias:App\Models\Workbook');
        $mock->shouldReceive('where->get')->andReturn((object)[
            'user_id' => 1,
            'workbook_id'=>'5de31232-20ba-49f5-980c-ce6356e276ab'
        ]);

        $worksmock = Mockery::mock('alias:App\Models\Work');
        $worksmock->shouldReceive('where->get')->andReturn((object)[
            'workbook_id'=>'5de31232-20ba-49f5-980c-ce6356e276ab'
        ]);


        $result = $workService->getTitle(1);
        $this->assertNotNull($result);

        $result = $workService->getTitle(100);
        $this->assertNotNull($result);

        $result = $workService->getWorks('5de31232-20ba-49f5-980c-ce6356e276ab');
        $this->assertNotNull($result);    



    }
}

