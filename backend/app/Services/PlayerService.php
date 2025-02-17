<?php

namespace App\Services;

use App\Repositories\PlayerRepository;

class PlayerService
{
    protected $playerRepository;

    public function __construct(PlayerRepository $playerRepository)
    {
        $this->playerRepository = $playerRepository;
    }

    public function getAllPlayers()
    {
        return $this->playerRepository->getAllPlayers();
    }

    public function getPlayerById($id)
    {
        return $this->playerRepository->getPlayerById($id);
    }

    public function createPlayer($data)
    {
        return $this->playerRepository->createPlayer($data);
    }

    public function updatePlayer($id, $data)
    {
        return $this->playerRepository->updatePlayer($id, $data);
    }

    public function deletePlayer($id)
    {
        return $this->playerRepository->deletePlayer($id);
    }
}