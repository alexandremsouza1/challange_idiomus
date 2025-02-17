<?php

namespace App\Repositories;

use App\Models\Player;

class PlayerRepository 
{
    protected $model;

    public function __construct(Player $model)
    {
      $this->model = $model;
    }

    public function getAllPlayers()
    {
      return $this->model->all();
    }

    public function getPlayerById($id)
    {
      return $this->model->find($id);
    }

    public function createPlayer($data)
    {
      return $this->model->create($data);
    }

    public function updatePlayer($id, $data)
    {
      return $this->model->find($id)->update($data);
    }

    public function deletePlayer($id)
    {
      return $this->model->find($id)->delete();
    }
    
}
    